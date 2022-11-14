<template>
  <div class="containter" style="margin-left: 600px; margin-right: 600px">
    <div class="taskslist">
      <h2>List Mahasiswa </h2>
      <br />
      <table class="table">
        <thead class="table" style="background-color: #ffe4e1">
          <tr>
            <th class="descrption">Nama</th>
            <th class="nrp">NRP</th>
          </tr>
        </thead>
        <tbody style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
          <tr v-for="(task, i) in show" :key="i">
            <td class="description" v-bind:class="{ completed: task.completed }" @click="toggleTask(task.id, task.completed)">
              {{ task.description }}
            </td>
            <td class="nrp">
              <p v-for="data in task.nrp" v-bind:key="data in task.nrp">
                {{ data }}
              </p>
            </td>
            <td>
              <router-link :to="{ name: 'update', params: { id: task.id } }" class="btn btn-primary"
                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                  <path
                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>
            </router-link>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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
    };
  },
  methods: {
    async deleteTask(id) {
      const tasksCollection = doc(db, 'task', id);
      try {
        await deleteDoc(tasksCollection);
        this.load();
      } catch (err) {
        console.log('error');
      }
    },
    async toggleTask(id, completed) {
      const docUp = doc(db, 'task', id);
      completed = !completed;
      await updateDoc(docUp, { completed: completed });
      this.load();
    },
    async load() {
      try {
        const querySnapshot = await getDocs(collection(db, 'task'));
        this.tasks = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.tasks.push(doc.data());
        });
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  computed: {
    show() {
      return this.tasks.filter((task) => task.nrp == 'Wishlist');
    },
  },
  created() {
    this.load();
  },
};
</script>

<style>
.taskslist table th.edit,
.taskslist table th.delete {
  width: 100px;
}
.taskslist tbody td.description {
  cursor: pointer;
}
.completed {
  text-decoration: line-through;
}
</style>
