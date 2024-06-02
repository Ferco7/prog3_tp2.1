// clase customer
class Customer {
    constructor(id, name, email) {
        // Inicializa propiedades
        this.id = id; // id del cliente
        this.name = name; // nombre del cliente
        this.email = email; // correo del cliente
    }

    // retorna una cadena con el nombre y correo
    get info() {
        return `${this.name} (${this.email})`;
    }
}

// clase reservation
class Reservation {
    constructor(id, customer, date, guests) {
        // Inicializa propiedades id, customer, date y guests de la reserva
        this.id = id; 
        this.customer = customer;

        // convierto la fecha en un objeto date
        this.date = new Date(date);
        this.guests = guests;
    }

    // retorna cadena con la fecha y hora de la reserva, la info del cliente y el nro de comensales
    get info() {
        return `Fecha y hora: ${this.date.toLocaleDateString()}, Cliente: ${this.customer.info}, Numero de comensales: ${this.guests}`;
    }

    // metodo estatico que valida la fecha de la reserva y la cantidad de comensales
    static validateReservation(date, guests) {
        // convierte la fecha de la reserva a un objeto date
        const reservationDate = new Date(date);
        // obtiene la fecha actual
        const currentDate = new Date();
        // la reserva es valida si la fecha es posterior a la fecha actual y la cantidad de comensales es mayot que 0
        return reservationDate >= currentDate && guests > 0;
    }
}

// class restaurant (sin cambios como pide la consigna)
class Restaurant {
    constructor(name) {
        // inicializa el nombre del restaurante y la lista de reservas
        this.name = name;
        this.reservations = [];
    }

    // metodo para agregar una reserva a la lista de reservas
    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    // metodo para renderizar las reservas en el dom
    render() {
        // obtiene el contenedor donde se muestra las reservas
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        // itera sobre cada reserva en la lista de reservas
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            // define el contenido html de la tarjeta de la reserva
            reservationCard.innerHTML = `
                    <p class="subtitle has-text-primary">
                        Reserva ${
                            reservation.id
                        } - ${reservation.date.toLocaleString()}
                    </p>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                ${reservation.info}
                            </p>
                        </div>
                    </div>
              `;
            // agrega la tarjeta de la reserva al contenedor
            container.appendChild(reservationCard);
        });
    }
}

// event listener para manejar las reservas
document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        // obtiene los valores del formulario
        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        // validamos la reserva
        if (Reservation.validateReservation(reservationDate, guests)) {
            // asigna identificadores unicos para el cliente y la reserva
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            // crea instancias de customer y reservation
            const customer = new Customer(
                customerId,
                customerName,
                customerEmail
            );
            const reservation = new Reservation(
                reservationId,
                customer,
                reservationDate,
                guests
            );

            // agrega la reserva al restaurante y renderiza las reservas
            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            // miestra una alerta si los datos de reserva son invalidos
            alert("Datos de reserva inválidos");
            return;
        }
    });

// crea una instancia del restaurante
const restaurant = new Restaurant("El Lojal Kolinar");

// ejemplo de reserva
const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

// valida y agrega la reserva de prueba si es valida
if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
    restaurant.addReservation(reservation1);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
