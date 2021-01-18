<template>
  <ion-item-sliding v-if="message" ref="theItem">
    <ion-item :detail="false" class="list-item">
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
      </ion-label>
    </ion-item>

    <!-- options -->
    <ion-item-options side="end">
      <ion-item-option @click="onDelete" color="danger">
        <ion-icon :icon="trashBin" style="zoom : 2"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonItemSliding,
  IonItemOption,
  IonItemOptions
} from "@ionic/vue";
import { chevronForward, trashBin } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageListItem",
  components: {
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonItemSliding,
    IonItemOption,
    IonItemOptions
  },
  props: {
    message: Object
  },
  methods: {
    async onDelete() {
      // why do I need to wrap this??
      await (this.$refs.theItem as any).$el.close();
      this.$emit("delete-item", { id: this.message?.id });
    },

    isIos: () => {
      const win = window as any;
      return win && win.Ionic && win.Ionic.mode === "ios";
    }
  },
  data() {
    return { chevronForward, trashBin};
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