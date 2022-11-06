<template>
  <div>
    <div class="todolist" style="margin-left: 600px;margin-right: 600px;">
    <div class="justify-content-center" style="background-color:#FFE4E1 ;padding: 20px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >
      <div class="container" style="max-width: 45rem;">
        <h1>To Do List</h1>
        <!-- <div class="form-group"> -->
        <form @submit.prevent="addTask">
          <div for="newTaskDescription" style="padding-bottom: 10px;">Add New Task :</div>
          <input type="text" class="form-control" ref="desc" v-model="this.description" placeholder="add new" required style="margin-bottom: 15px" />
          <div class="form-check form-check-inline" style="margin-bottom: 15px">
            <input class="form-check-input" type="checkbox" id="newWishlist" value="Wishlist" v-model="newTags" />
            <label class="form-check-label" for="Wishlist">Wishlist</label>
          </div>
          <label class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="newWork" value="Work" v-model="newTags" />
            <label class="form-check-label" for="Work">Work</label>
          </label>
          <div class="form-create">
            <button class="btn" type="submit" value="Submit" style="background-color:	#BC8F8F;">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <br>
    <h2>List of Tasks</h2>
    <br />
    <div class="taskslist" style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
      <div class="d-flex justify-content-center">
        <label class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="Wishlist" value="Wishlist" v-model="checkedTags" />
          <label class="form-check-label" for="Wishlist">Wishlist</label>
        </label>
        <label class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="Work" value="Work" v-model="checkedTags" />
          <label class="form-check-label" for="Work">Work</label>
        </label>
      </div>
      <button @click="load" class="btn" style=" margin-left: 48%; margin-top: 15px;background-color: #BC8F8F;">Apply</button>
    </div>
  </div>
  <br />
<div class="containter" style="margin-left: 600px; margin-right: 600px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
  <table class="table">
    <thead>
      <tr style="background-color: #ffe4e1;">
        <th class="descrption">Description</th>
        <th class="tags">Task</th>
        <th class="tags">Edit</th>
        <th class="tags">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, i) in tasks" :key="i">
        <td class="description" v-bind:class="{ completed: task.completed }" @click="toggleTask(task.id, task.completed)">
          <input type="checkbox" />
          {{ task.description }}
        </td>
        <td class="tags">
          <p v-for="data in task.tags" v-bind:key="data in task.tags">
            {{ data }}
          </p>
        </td>
        <td>
          <router-link :to="{ name: 'update', params: { id: task.id } }" class="btn btn-primary"
            ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
              />
            </svg>
          </router-link>
        </td>
        <td>
          <button class="btn btn-danger" @click="deleteTask(task.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
    async deleteTask(id) {
      const tasksCollection = doc(db, 'task', id);
      try {
        await deleteDoc(tasksCollection);
        this.load();
      } catch (err) {
        console.log('error');
      }
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
