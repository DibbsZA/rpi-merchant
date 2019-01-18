import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Item, Order, Upload } from './item';
import { User } from './user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DatabaseService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDocument: AngularFirestoreDocument<Node>;

  drinkCollection: AngularFirestoreCollection<Item>;
  drinkDocument: AngularFirestoreDocument<Node>;

  mealCollection: AngularFirestoreCollection<Item>;
  mealDocument: AngularFirestoreDocument<Node>;

  foodCollection: AngularFirestoreCollection<Item>;
  foodDocument: AngularFirestoreDocument<Node>;

  snakCollection: AngularFirestoreCollection<Item>;
  snakDocument: AngularFirestoreDocument<Node>;

  userCollection: AngularFirestoreCollection<User>;
  userDocument: AngularFirestoreDocument<Node>;

  uploadsRef: AngularFirestoreCollection<Upload>;
  uploads: Observable<Upload[]>;
  public lastUpload: Upload;
  public lastUploadUrl: String;

  constructor(private afs: AngularFirestore) {
    this.ordersCollection = this.afs.collection('past_orders', ref => ref.orderBy('orderNumber', 'desc').limit(10));
    this.drinkCollection = this.afs.collection('drink');
    this.foodCollection = this.afs.collection('food');
    this.snakCollection = this.afs.collection('snaks');
    this.mealCollection = this.afs.collection('meals');
    this.userCollection = this.afs.collection('users');
  }

  updateNumRequested(num) {
    this.ordersCollection = this.afs.collection('past_orders', ref => ref.orderBy('orderNumber', 'desc').limit(num));
  }

  getSnapshot() {
    return this.ordersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getOrder(id) {
    return this.afs.doc<Order>('past_orders/' + id);
  }

  /**
   * Push and Order item into the cart collection
   *
   * @param itemList List of items
   * @param total Total cart value
   * @param cartNumItems Number items in the cart
   */
  pushOrder(itemList: Item[], total: number, cartNumItems: number) {
    const date = Date.now().toString();
    const ticket: Order = {
      orderNumber: date,
      items: itemList,
      cartTotal: total,
      cartNumItems: cartNumItems
    };

    return this.ordersCollection.add(ticket);
  }

  deleteOrder(id) {
    return this.getOrder(id).delete();
  }

  // Edit POS Items

  // Type selects the right collection to query for ID
  getItem(id, type) {
    let collection = '';
    switch (type) {
      case 'Food':
        collection = 'food/';
        break;

      case 'Drink':
        collection = 'drink/';
        break;

      case 'Snacks':
        collection = 'snaks/';
        break;

      case 'Meals':
        collection = 'meals/';
        break;

      default:
        break;
    }
    // if (type === 'Food') {
    //   collection = 'food/';
    // } else {
    //   collection = 'drink/';
    // }
    return this.afs.doc<Item>(collection + id);
  }

  deleteItem(id, type, img) {
    this.deleteUpload(img);
    return this.getItem(id, type).delete();
  }

  updateItem(id, itemdata: Item) {
    return this.getItem(id, itemdata.item_type).update(itemdata);
  }

  /**
   *
   *
   * @param  name Name
   * @param  price Price
   * @param  type Item Type
   * @param  img_name Image File name
   * @param  img_url Image URL
   */
  pushItem(name: string, price: number, type: string, img_name: string, img_url: string) {
    const item: Item = {
      name: name,
      price: price,
      item_type: type,
      quantity: 1,
      img_name: img_name,
      img_url: img_url
    };
    switch (type) {
      case 'Food':
        return this.foodCollection.add(item);
        break;

      case 'Drink':
        return this.drinkCollection.add(item);
        break;

      case 'Snacks':
        return this.snakCollection.add(item);
        break;

      case 'Meals':
        return this.mealCollection.add(item);
        break;

      default:
        break;
    }
  }

  getFood() {
    return this.foodCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getDrink() {
    return this.drinkCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getSnaks() {
    return this.snakCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getMeals() {
    return this.mealCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getUsers() {
    return this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          return { id: a.payload.doc.id, ...a.payload.doc.data() };
        });
      })
    );
  }

  getUser(id) {
    return this.afs.doc<User>('users/' + id);
  }

  deleteUser(id) {
    this.getUser(id).delete();
  }

  updateUser(id, roles) {
    return this.getUser(id).update(roles);
  }

  pushUpload(name: string, price: number, type: string, upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${'/'}/${upload.file.name}`).put(upload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        // upload in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      error => {
        // upload failed
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          // upload success
          upload.url = downloadURL;
          upload.name = upload.file.name;
          this.lastUpload = upload;
          return this.pushItem(name, price, type, upload.name, upload.url);
        });
      }
    );
  }

  deleteUpload(name: string) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('/' + name);
    imageRef.delete();
  }
}
