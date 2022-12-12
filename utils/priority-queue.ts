class QElement<T> {
    element: T
    priority: number

    constructor(element: T, priority: number)
    {
        this.element = element;
        this.priority = priority;
    }
}
 
export class PriorityQueue<T> {
 
    items: QElement<T>[]
    constructor()
    {
        this.items = [];
    }
 

    enqueue(item, priority) {
        for(let i = 0; i < this.items.length; i++) {
            if(priority < this.items[i].priority) {
                this.items.splice(i, 0, new QElement(item, priority))
                return

            }
        }

        this.items.push(new QElement<T>(item, priority))
    }

    dequeue() {
        return this.items.shift()
    }
    front() {
        if(this.isEmpty()) return undefined
        return this.items[0]
    }
    rear() {
        if(this.isEmpty()) return undefined
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length === 0
    }
    printPQueue() {
        return this.items.map((i) => i.element as String).join(" ")
    }
}