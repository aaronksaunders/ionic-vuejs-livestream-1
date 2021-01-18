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
      <ion-loading :is-open="isLoading" message="Loading"></ion-loading>
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list>
        <MessageListItem
          v-for="message in displayMessages"
          :key="message.id"
          :message="message"
          @delete-item="handleMessageDelete"
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
        :color="toastInfo.color"
        :is-open="toastInfo.showMe"
        :message="toastInfo.message"
        :duration="2000"
        @onDidDismiss="toastInfo.showMe = false"
      >
      </ion-toast>

      <!-- before delete -->
      <ion-alert
        :is-open="deleteAlertInfo.showMe"
        header="Alert"
        sub-header="Warning"
        message="Are You Sure You Want To Delete This Item"
        :buttons="deleteAlertInfo.buttons"
        @onDidDismiss="deleteAlertInfo.showMe = false"
      >
      </ion-alert>
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
  IonToast,
  IonAlert,
  IonLoading

} from "@ionic/vue";
import MessageListItem from "@/components/MessageListItem.vue";
import { defineComponent } from "vue";
import {
  getMessages,
  addMessage,
  deleteMessage,
  messages,
  loading
} from "@/data/messages";
import AModal from "@/components/AModal.vue";

export default defineComponent({
  name: "Home",
  computed: {
    isLoading: () => {
      return loading.value ? true : false 
    }
  },
  data() {
    return {
      displayMessages: [{}],
      // Info for displaying the modal
      addItemModalInfo: {
        showMe: false
      },
      // Info for displaying the alert
      toastInfo: {
        showMe: false,
        message: "",
        color: ""
      },
      // delete alert info
      deleteAlertInfo: {
        showMe: false,
        buttons: {}
      }
    };
  },
  methods: {
    deleteMessageConfirmed(id: any) {
      deleteMessage(id);

      // display toast
      this.toastInfo = {
        showMe: true,
        message: "User Deleted Item",
        color: "primary"
      };
    },
    /**
     * called to delete the message in response to
     * delete-item event emitted
     */
    handleMessageDelete(_event: any) {
      // show alert to confirm delete
      this.deleteAlertInfo = {
        showMe: true,
        buttons: [
          { text: "Cancel" },
          {
            text: "YES - Delete Message",
            handler: () => {
              this.deleteMessageConfirmed(_event.id);
            }
          }
        ]
      };
    },
    /**
     * called to close the modal in response to
     * cancelled event emitted
     */
    handleModalCancelled(_event: any) {
      console.log(_event);
      this.addItemModalInfo.showMe = false;

      // display toast
      this.toastInfo = {
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
      addMessage(_event);

      // display toast
      this.toastInfo = {
        showMe: true,
        message: "User Input Saved",
        color: "primary"
      };
    },
    showAddItem() {
      this.addItemModalInfo.showMe = true;
    },
    refresh: (ev: CustomEvent) => {
      getMessages();
      (ev.target as any).complete();
    }
  },
  async mounted() {
    await getMessages();
    this.displayMessages = messages;
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
    IonToast,
    IonAlert,
    IonLoading
  }
});
</script>