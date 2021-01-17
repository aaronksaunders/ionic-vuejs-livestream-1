<template>
  <ion-item v-if="message" :detail="false" class="list-item">
    <div slot="start" :class="!message.read ? 'dot dot-unread' : 'dot'"></div>
    <ion-label class="ion-text-wrap">
      <div @click="$router.push('/message/' + message?.id)">
        <h2>
          {{ message.fromName }}
          <span class="date">
            <ion-note>{{ message.date }}</ion-note>
            <ion-icon
              :icon="chevronForward"
              size="small"
              v-if="isIos()"
            ></ion-icon>
          </span>
        </h2>
        <h3>{{ message.subject }}</h3>
        <p>
          {{ message.body }}
        </p>
      </div>
      <div>
        <ion-button size="small" color="danger" @click="onDelete"
          >DELETE</ion-button
        >
      </div>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonNote, IonButton } from "@ionic/vue";
import { chevronForward } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageListItem",
  components: {
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonButton
  },
  props: {
    message: Object
  },
  methods: {
    onDelete() {
      this.$emit("delete-item", { id: this.message?.id });
    },

    isIos: () => {
      const win = window as any;
      return win && win.Ionic && win.Ionic.mode === "ios";
    }
  },
  data() {
    return { chevronForward };
  }
});
</script>

<style scoped>
.list-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item h2 {
  font-weight: 600;
  margin: 0;
}

.list-item p {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 95%;
}

.list-item .date {
  float: right;
  align-items: center;
  display: flex;
}

.list-item ion-icon {
  color: #c9c9ca;
}

.list-item ion-note {
  font-size: 15px;
  margin-right: 8px;
  font-weight: normal;
}

.list-item ion-note.md {
  margin-right: 14px;
}

.list-item .dot {
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  align-self: start;
  margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
  background: var(--ion-color-primary);
}
</style>