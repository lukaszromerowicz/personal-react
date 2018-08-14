export default class {
  constructor() {
    this.subscriberKey = 0
    this.subscribers = {}
    this.topics = {}
  }

  subscribe = (topic, subscriber) => {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }

    this.subscribers[this.subscriberKey] = subscriber
    this.topics[topic].push(this.subscriberKey)

    console.log('hi im finished')
    return this.subscriberKey++
  }

  publish = (topic, args) => {
    for (var sub in this.topics[topic]) {
      try {
        this.subscribers[sub](args)
      } catch (ignore) {}
    }
  }

  unsubscribe = key => {
    delete this.subscribe[key]
  }
}
