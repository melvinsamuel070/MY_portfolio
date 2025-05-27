// firebase-service.js
class FirebaseService {
  constructor() {
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  // Generic CRUD operations
  async addDocument(collectionName, data) {
    try {
      const docRef = await this.db.collection(collectionName).add(data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  async getDocuments(collectionName) {
    try {
      const snapshot = await this.db.collection(collectionName).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  }

  async updateDocument(collectionName, id, data) {
    try {
      await this.db.collection(collectionName).doc(id).update(data);
      return { id, ...data };
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }

  async deleteDocument(collectionName, id) {
    try {
      await this.db.collection(collectionName).doc(id).delete();
      return id;
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  }

  // Specific collection operations
  async getProjects() {
    return this.getDocuments('projects');
  }

  async addProject(projectData) {
    return this.addDocument('projects', projectData);
  }

  async updateProject(id, projectData) {
    return this.updateDocument('projects', id, projectData);
  }

  async deleteProject(id) {
    return this.deleteDocument('projects', id);
  }

  // Similar methods for other collections:
  // getTutorials(), addTutorial(), etc.
  // getSuccessItems(), addSuccessItem(), etc.
  // getErrors(), addError(), etc.
  // getBooks(), addBook(), etc.

  // File upload method
  async uploadFile(file, path) {
    try {
      const storageRef = this.storage.ref(path);
      const uploadTask = storageRef.put(file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          null, 
          (error) => reject(error),
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw error;
    }
  }
}

const firebaseService = new FirebaseService();