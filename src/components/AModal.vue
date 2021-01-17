<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end"
          ><ion-button @click="cancelModal" color="danger"
            >CANCEL</ion-button
          ></ion-buttons
        >
        <ion-title>MY INPUT MODAL</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-item>
        <ion-label>FROM</ion-label>
        <ion-input v-model="formInfo.fromName"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>SUBJECT</ion-label>
        <ion-input v-model="formInfo.subject"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label>DATE</ion-label>
        <ion-datetime v-model="formInfo.date"></ion-datetime>
      </ion-item>

      <ion-item>
        <ion-label>BODY</ion-label>
        <ion-textarea rows="6" v-model="formInfo.body"></ion-textarea>
      </ion-item>
      <ion-button :disabled="disableSave"
      @click="saveModal" expand="full">SAVE MODAL</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonInput,
  IonDatetime,
  IonLabel,
  IonItem,
  IonTextarea
} from "@ionic/vue";
import { ref, computed } from "vue";

export default {
  name: "AModal",
  setup(props, context) {
    // form fields saved here
    const formInfo = ref({
      subject: "",
      date: "",
      body: "",
      fromName: ""
    });
    console.log(props);

/**
 * used to disable save button
 */
    const disableSave = computed(() => {
      if (
        formInfo.value.subject === "" ||
        formInfo.value.date === "" ||
        formInfo.value.body === "" ||
        formInfo.value.fromName === ""
      ) {
        return true;
      } else {
        return false;
      }
    });

    /**
     * called to cancel modal, no info returned
     */
    const cancelModal = () => {
      console.log("cancel clicked");
      context.emit("modalCancelled", null);
    };
    /**
     * called to SAVE modal, info returned
     */
    const saveModal = () => {
      console.log("save clicked");
      context.emit("modalSaved", { ...formInfo.value });
    };
    return {
      cancelModal,
      formInfo,
      saveModal,
      disableSave
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonInput,
    IonDatetime,
    IonLabel,
    IonItem,
    IonTextarea
  }
};
</script>

<style lang="scss" scoped>
</style>