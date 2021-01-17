<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end"
          ><ion-button @click="showAddItem">ADD</ion-button></ion-buttons
        >
        <ion-title>LIST PAGE</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list>
        <MessageListItem
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </ion-list>

      <!-- INPUT MODAL -->
      <ion-modal :is-open="addItemModalInfo.showMe">
        <a-modal
          @modalSaved="handleModalSaved"
          @modalCancelled="handleModalCancelled"
        ></a-modal>
      </ion-modal>
      <!-- CONFIRMATION TOAST -->
      <ion-toast 
       :color="alertInfo.color"
        :is-open="alertInfo.showMe"
        :message="alertInfo.message"
        :duration="2000"
        @onDidDismiss="alertInfo.showMe = false"
      >
      </ion-toast>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonModal,
  IonToast
} from "@ionic/vue";
import MessageListItem from "@/components/MessageListItem.vue";
import { defineComponent } from "vue";
import { getMessages } from "@/data/messages";
import AModal from "@/components/AModal.vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      messages: getMessages(),
      // Info for displaying the modal
      addItemModalInfo: {
        showMe: false
      },
      // Info for displaying the alert
      alertInfo: {
        showMe: false,
        message: "",
        color : ""
      }
    };
  },
  methods: {
    /**
     * called to close the modal in response to
     * cancelled event emitted
     */
    handleModalCancelled(_event: any) {
      console.log(_event);
      this.addItemModalInfo.showMe = false;

      // display toast
      this.alertInfo = {
        showMe: true,
        message: "User Cancelled Input",
        color: "danger"
      };
    },
    /**
     * called to close the modal in response to save
     * event emitted
     */
    handleModalSaved(_event: any) {
      console.log(_event);
      this.addItemModalInfo.showMe = false;

      // STEP TO SAVE TO DATABASE....

      // display toast
      this.alertInfo = {
        showMe: true,
        message: "User Input Saved",
        color: "primary"
      };
    },
    showAddItem() {
      this.addItemModalInfo.showMe = true;
    },
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    }
  },
  components: {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    MessageListItem,
    IonButton,
    IonButtons,
    IonModal,
    AModal,
    IonToast
  }
});
</script>