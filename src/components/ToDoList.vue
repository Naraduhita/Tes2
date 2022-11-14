<template>
  <div>
    <div class="todolist" style="margin-left: 600px;margin-right: 600px;">
    <div class="justify-content-center" style="background-color:#FFE4E1 ;padding: 20px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >
      <div class="container" style="max-width: 45rem;">
        <h1>Daftar Mahasiswa</h1>
        <!-- <div class="form-group"> -->
        <form @submit.prevent="addTask">
          <div for="newTaskDescription" style="padding-bottom: 10px;">Add Nama :</div>
          <input type="text" class="form-control" ref="desc" v-model="this.description" placeholder="add name" required style="margin-bottom: 15px" />
          <div for="newTaskDescription" style="padding-bottom: 10px;">Add NRP :</div>
          <input type="text" class="form-control" ref="desc" v-model="this.description" placeholder="add NRP" required style="margin-bottom: 15px" />
          <div class="form-create">
            <button class="btn" type="submit" value="Submit" style="background-color:	#BC8F8F;">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <br>
</div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDoxwsIawb6OgHkTMQb7nfaKDK4UI_l2iI',
  authDomain: 'to-do-list-4cb26.firebaseapp.com',
  projectId: 'to-do-list-4cb26',
  storageBucket: 'to-do-list-4cb26.appspot.com',
  messagingSenderId: '370583068284',
  appId: '1:370583068284:web:37c07c39648ad1ed15b3f9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default {
  data() {
    return {
      creationTime: null,
      description: '',
      tasks: [],
      checkedTags: [],
      newTags: [],
    };
  },
  methods: {
    async addTask() {
      const tasksCollection = await addDoc(collection(db, 'task'), {
        id: '',
        description: this.description,
        completed: false,
        // cat: this.$refs.cat.value,
        creationTime: Date.now(),
        tags: this.newTags,
      });
      const docUp = doc(db, 'task', tasksCollection.id);
      await updateDoc(docUp, { id: tasksCollection.id });
      console.log(tasksCollection);
      this.description = '';
      this.load();
    },
    async load() {
      try {
        const q = query(collection(db, 'task'), where('tags', 'array-contains-any', this.checkedTags));
        const querySnapshot = await getDocs(q);
        this.tasks = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.tasks.push(doc.data());
        });
      } catch (err) {
        const q = collection(db, 'task');
        const querySnapshot = await getDocs(q);
        this.tasks = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.tasks.push(doc.data());
        });
        console.log(this.post);
      }
    },
    async toggleTask(id, completed) {
      const docUp = doc(db, 'task', id);
      completed = !completed;
      await updateDoc(docUp, { completed: completed });
      this.load();
    },
  },
  created() {
    this.load();
  },
};
</script>

<style>
/* .taskslist table th.edit,
.taskslist table th.delete {
    width: 100px;
} */

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.taskslist tbody td.description {
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
}
</style>
