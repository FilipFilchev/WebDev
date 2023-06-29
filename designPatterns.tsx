/* 11 most common deisgn patterns with TS */
//enjoy!


//Singleton: Used to ensure that a class has only one instance and provides a global point of access to it.

class Database {
    private static instance: Database;
  
    private constructor() {}
  
    static getInstance(): Database {
      if (!Database.instance) {
        Database.instance = new Database();
      }
      return Database.instance;
    }
  }
  
  const db1 = Database.getInstance();
  const db2 = Database.getInstance();
  
  console.log(db1 === db2); // Output: true
  

//Inheritance:  Allows classes to inherit properties and methods from a parent class, enabling code reuse and creating a hierarchical relationship between classes.

class Vehicle {
  constructor(public brand: string) {}

  honk() {
    console.log('Honk');
  }
}

class Car extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
}

class Motorcycle extends Vehicle {
  constructor(brand: string) {
    super(brand);
  }
}

const car = new Car('Mercedes');
const motorcycle = new Motorcycle('Ducati Monster');

car.honk(); // Output: Honk
motorcycle.honk(); // Output: Honk


//Prototype - Clone: Used to create new objects by cloning existing objects, providing a mechanism for creating object instances efficiently.

interface Shape {
  clone(): Shape;
}

class Circle implements Shape {
  constructor(public radius: number) {}

  clone(): Shape {
    return new Circle(this.radius);
  }
}

class Square implements Shape {
  constructor(public sideLength: number) {}

  clone(): Shape {
    return new Square(this.sideLength);
  }
}

const originalCircle = new Circle(5);
const clonedCircle = originalCircle.clone() as Circle;

console.log(originalCircle.radius); // Output: 5
console.log(clonedCircle.radius); // Output: 5


//Builder: Simplifies the construction of complex objects by separating the construction process from its representation, allowing the same construction process to create different representations. 

class HouseBuilder {
  private builders: string[] = [];

  addStructure(builder: string): HouseBuilder {
    this.builders.push(builder);
    return this;
  }

  build(): House {
    return new House(this.builders);
  }
}

class House {
  constructor(public builders: string[]) {}
}

const house = new HouseBuilder()
  .addStructure('Walls')
  .addStructure('Roof')
  .build();

console.log(house.builders); // Output: ['Walls', 'Roof']


//Factory: Provides an interface for creating objects, allowing subclasses or concrete implementations to decide which class to instantiate.

interface Animal {
  makeSound(): void;
}

class Dog implements Animal {
  makeSound() {
    console.log('Bark');
  }
}

class Cat implements Animal {
  makeSound() {
    console.log('Meow');
  }
}

class AnimalFactory {
  createAnimal(animalType: string): Animal {
    if (animalType === 'dog') {
      return new Dog();
    } else {
      return new Cat();
    }
  }
}

const animalFactory = new AnimalFactory();
const dog = animalFactory.createAnimal('dog');
const cat = animalFactory.createAnimal('cat');

dog.makeSound(); // Output: Bark
cat.makeSound(); // Output: Meow


//Facade: Provides a simplified interface to a complex subsystem, making it easier to use by hiding its complexity behind a single unified interface.


class NotificationService {
  sendNotification(message: string) {
    console.log('Sending notification:', message);
  }
}

class LoggingService {
  logMessage(message: string) {
    console.log('Logging message:', message);
  }
}

class PaymentService {
  processPayment(amount: number) {
    console.log('Processing payment:', amount);
  }
}

class OrderFacade {
  private notificationService: NotificationService;
  private loggingService: LoggingService;
  private paymentService: PaymentService;

  constructor() {
    this.notificationService = new NotificationService();
    this.loggingService = new LoggingService();
    this.paymentService = new PaymentService();
  }

  placeOrder(amount: number) {
    this.loggingService.logMessage('Order placed');
    this.paymentService.processPayment(amount);
    this.notificationService.sendNotification('Order placed successfully');
  }
}

const orderFacade = new OrderFacade();
orderFacade.placeOrder(100); // Output: Logging message: Order placed, Processing payment: 100, Sending notification: Order placed successfully


//Proxy: Acts as a placeholder for another object, controlling access to it and adding extra behavior, such as lazy loading or caching.

interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadImageFromDisk();
  }

  private loadImageFromDisk() {
    console.log(`Loading image: ${this.filename}`);
  }

  display() {
    console.log(`Displaying image: ${this.filename}`);
  }
}

class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

const image = new ProxyImage('snimka.jpg');
image.display(); // Output: Loading image: snimka.jpg, Displaying image: snimka.jpg
image.display(); // Output: Displaying image: snimka.jpg


//Iterator: Provides a way to access elements of an aggregate object sequentially without exposing its underlying structure, allowing you to traverse collections easily. 

interface Iterator<T, TReturn = any, TNext = undefined> {
  next(value?: TNext): IteratorResult<T, TReturn>;
  hasNext(): boolean;
}

class NumberIterator implements Iterator<number> {
  private current = 0;
  private readonly numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  next(): IteratorResult<number> {
    if (this.hasNext()) {
      const value = this.numbers[this.current++];
      return { value, done: false };
    }
    return { value: undefined, done: true };
  }

  hasNext(): boolean {
    return this.current < this.numbers.length;
  }
}

const numbers = [1, 2, 3, 4, 5];
const iterator = new NumberIterator(numbers);

while (iterator.hasNext()) {
  const { value } = iterator.next();
  console.log(value);
}
// Output: 1, 2, 3, 4, 5



//Observer: Defines a one-to-many dependency between objects, so that when one object changes its state, all its dependents are notified and updated automatically.

interface Observer {
  update(message: string): void;
}

class User1 implements Observer {
  constructor(private name: string) {}

  update(message: string) {
    console.log(`${this.name} received message: ${message}`);
  }
}

class MessagePublisher {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(message: string) {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }
}

const publisher = new MessagePublisher();
const user11 = new User1('John');
const user22 = new User1('Jane');

publisher.attach(user11);
publisher.attach(user22);

publisher.notify('Hello, World!');
// Output: John received message: Hello, World!
// Output: Jane received message: Hello, World!

publisher.detach(user11);

publisher.notify('New message!');
// Output: Jane received message: New message!


//Mediator: Defines an object that encapsulates how a set of objects interact, promoting loose coupling between them by centralizing communication and reducing dependencies. 

interface Mediator {
  sendMessage(message: string, sender: Colleague): void;
}

class Chatroom implements Mediator {
  private colleagues: Colleague[] = [];

  addColleague(colleague: Colleague) {
    this.colleagues.push(colleague);
  }

  sendMessage(message: string, sender: Colleague) {
    for (const colleague of this.colleagues) {
      if (colleague !== sender) {
        colleague.receiveMessage(message);
      }
    }
  }
}

abstract class Colleague {
  constructor(protected mediator: Mediator) {}

  abstract sendMessage(message: string): void;

  receiveMessage(message: string) {
    console.log(`Received message: ${message}`);
  }
}

class User extends Colleague {
  constructor(mediator: Mediator, private name: string) {
    super(mediator);
  }

  sendMessage(message: string) {
    this.mediator.sendMessage(message, this);
  }
}

const chatroom = new Chatroom();
const user1 = new User(chatroom, 'John');
const user2 = new User(chatroom, 'Jane');

chatroom.addColleague(user1);
chatroom.addColleague(user2);

user1.sendMessage('Hello from User 1!');
user2.sendMessage('Hi from User 2!');
// Output: Received message: Hi from User 2!


//State: Allows an object to alter its behavior when its internal state changes, encapsulating state-specific logic into separate state classes and enabling dynamic behavior changes. 

interface State {
  handle(context: Context): void;
}

class Context {
  private state: State;

  constructor() {
    this.state = new StateA();
  }

  setState(state: State) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

class StateA implements State {
  handle(context: Context) {
    console.log('State A');
    context.setState(new StateB());
  }
}

class StateB implements State {
  handle(context: Context) {
    console.log('State B');
    context.setState(new StateC());
  }
}

class StateC implements State {
  handle(context: Context) {
    console.log('State C');
    context.setState(new StateA());
  }
}

const context = new Context();

context.request(); // Output: State A
context.request(); // Output: State B
context.request(); // Output: State C
context.request(); // Output: State A
