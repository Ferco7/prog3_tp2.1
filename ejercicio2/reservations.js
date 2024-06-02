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

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
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
            container.appendChild(reservationCard);
        });
    }
}

document
    .getElementById("reservation-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate =
            document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

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

            restaurant.addReservation(reservation);
            restaurant.render();
        } else {
            alert("Datos de reserva inválidos");
            return;
        }
    });

const restaurant = new Restaurant("El Lojal Kolinar");

const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
    restaurant.addReservation(reservation1);
    restaurant.render();
} else {
    alert("Datos de reserva inválidos");
}
