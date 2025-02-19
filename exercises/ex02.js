// Create a function called groceryCheckout which processes a queue of customers
// Each customer has a cart (array of items with a name and price).
// Remove customers whose total cost is less than or equal to $50 from the queue.
// Make sure to implement FIFO (First-In, First-Out)

const Queue = require('../lib/Queue')

function groceryCheckout(queue) {
  const tempQueue = new Queue(); // Cola temporal para clientes con compras mayores a $50

  while (!queue.isEmpty()) {
    const customer = queue.dequeue(); // Extraer al primer cliente
    let totalCost = 0; // Inicializamos el costo total en 0

    // Usamos un bucle for para calcular el total del carrito
    for (let i = 0; i < customer.cart.length; i++) {
      totalCost += customer.cart[i].price;
    }

    if (totalCost > 50) { // Si el total es mayor a $50, el cliente sigue en la cola
      tempQueue.enqueue(customer);
    }
  }

  // Pasar los clientes filtrados de vuelta a la cola original
  while (!tempQueue.isEmpty()) {
    queue.enqueue(tempQueue.dequeue());
  }

}


const customers = new Queue();
customers.enqueue({ name: "Alice", cart: [{ item: "Milk", price: 10 }, { item: "Bread", price: 5 }] });
customers.enqueue({ name: "Bob", cart: [{ item: "Laptop", price: 500 }, { item: "Mouse", price: 20 }] });
customers.enqueue({ name: "Charlie", cart: [{ item: "Candy", price: 2 }, { item: "Juice", price: 3 }] });

groceryCheckout(customers);
console.log(customers.printQueue());
// Expected output:
// { name: "Bob", cart: [{ item: "Laptop", price: 500 }, { item: "Mouse", price: 20 }] ] }
