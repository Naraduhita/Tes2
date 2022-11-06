<template>
    <div class="taskEditor">
        <router-link :to="'/'" style="margin-left: 30px;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
</svg></router-link><br>
        <br>
        <div class="todolist" style="margin-left: 600px;margin-right: 600px;">
        <h1>Task Editor</h1>
        <form @submit.prevent="updateTask">
        <div class="form-group">
            <label for="taskDescription" style="margin-bottom: 10px;">Edit Task To :</label>
            <input type="text"  class="form-control" 
             placeholder="Add new task description here" ref="desc" v-model="this.tasks.description" style="margin-bottom: 15px"/>
            <div class="form-check form-check-inline" >
              <input class="form-check-input" type="checkbox" id="Wishlist" value="Wishlist" ref="opsi1" v-model="tags">
              <label class="form-check-label" for="Wishlist" style="margin-bottom: 15px">Wishlist</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="Work" value="Work" ref="opsi2" v-model="tags">
                <label class="form-check-label" for="Work">Work</label>
            </div>  
        </div>
        <div class="form-group form-check">
            <input type="checkbox" ref="rcomp"  v-model="this.tasks.completed"
            id="taskCompletionStatus" class="form-check-input"/>
            <label for="taskCompletionStatus" class="form-check-label">Completed</label>
        </div>
        <br>
        <button type="submit" class="btn btn-success">Update</button>
        </form>
      </div>
        <br>
        <h3 v-show="updated" style="color:#BC8F8F; text-align: center;">update successfully !</h3>
    </div>
</template>

<script>
import { initializeApp } from "firebase/app"
import { getFirestore, doc, updateDoc,getDoc,collection } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDoxwsIawb6OgHkTMQb7nfaKDK4UI_l2iI",
  authDomain: "to-do-list-4cb26.firebaseapp.com",
  projectId: "to-do-list-4cb26",
  storageBucket: "to-do-list-4cb26.appspot.com",
  messagingSenderId: "370583068284",
  appId: "1:370583068284:web:37c07c39648ad1ed15b3f9"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default {
    data() {
        return {
            updated: false,
            id: this.$route.params.id,
            tasks: [],
            updated: false,
            tags: []
        }
    },
    methods:{
        async updateTask(){
            const docUp = doc(db, "task", this.id)
            await updateDoc(docUp, {
                description: this.$refs.desc.value,
                completed: this.$refs.rcomp.checked ? true : false,
                // cat: this.$refs.cat.value,
                tags: this.tags
                })
                this.updated = true
    },
    async load(){
        try {

          this.tasks = await getDoc(doc(db, "task", this.id))
          this.tasks = this.tasks.data()
          this.tags = this.tasks.tags

        }
        catch(err){
          console.log(err.message)
        }
    }
  },
  created(){
    this.load()
  }
}
</script>

<style>
 
</style>