export default class {
  constructor() {
    this.subscriberKey = 0
    this.subscribers = {}
    this.messages = {
      mouseMove: [],
      deviceOrientation: []
    }
  }

  subscribe = (message, subscriber) => {
    this.subscribers[this.subscriberKey] = subscriber;
    this.messages[message].push(this.subscriberKey)

    this.subscriberKey++;
  }

  publish = (message, args) => {
    for (var sub in this.messages[message]) {
        try {
            this.subscribers[sub](args);
        } catch(ignore) {}
    }
  }

  unsubscribe = (key) => {
    delete this.subscribe[key]
  }
}