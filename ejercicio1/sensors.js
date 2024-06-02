// Clase que representa un sensor individual
class Sensor {
    constructor(id, name, type, value, unit, updated_at) {
        this.id = id;              // Identificador del sensor
        this.name = name;          // Nombre del sensor
        this.type = type;          // Tipo de sensor (temperature, humidity, pressure)
        this.value = value;        // Valor del sensor
        this.unit = unit;          // Unidad de medida del valor del sensor
        this.updated_at = updated_at; // Fecha de la última actualización
    }

    // Setter para actualizar el valor y la fecha de actualización del sensor
    set updateValue(newValue) {
        this.value = newValue;
        this.updated_at = new Date().toISOString();
    }
}

class SensorManager {
    constructor() {
        this.sensors = []; // Arreglo para almacenar los sensores
    }

    // Método para agregar un sensor al arreglo
    addSensor(sensor) {
        this.sensors.push(sensor);
    }

    // Método para actualizar el valor de un sensor específico
    updateSensor(id) {
        const sensor = this.sensors.find((sensor) => sensor.id === id);
        if (sensor) {
            let newValue;
            // Generar un nuevo valor aleatorio basado en el tipo de sensor
            switch (sensor.type) {
                case "temperature": // Rango de -30 a 50 grados Celsius
                    newValue = (Math.random() * 80 - 30).toFixed(2);
                    break;
                case "humidity": // Rango de 0 a 100%
                    newValue = (Math.random() * 100).toFixed(2);
                    break;
                case "pressure": // Rango de 960 a 1040 hPa (hectopascales)
                    newValue = (Math.random() * 80 + 960).toFixed(2);
                    break;
                default: // Valor por defecto si el tipo es desconocido
                    newValue = (Math.random() * 100).toFixed(2);
            }
            // Actualizar el valor y la fecha de actualización del sensor
            sensor.updateValue = newValue;
            // Renderizar nuevamente la lista de sensores
            this.render();
        } else {
            console.error(`Sensor ID ${id} no encontrado`);
        }
    }

    // Método asíncrono para cargar sensores desde un archivo JSON
    async loadSensors(url) {
        try {
            // Realizar una solicitud fetch para obtener el archivo JSON
            const response = await fetch(url);
            const sensorData = await response.json();
            // Crear instancias de Sensor y agregarlas al arreglo de sensores
            sensorData.forEach(sensorObj => {
                const { id, name, type, value, unit, updated_at } = sensorObj;
                if (["temperature", "humidity", "pressure"].includes(type)) {
                    const sensor = new Sensor(id, name, type, value, unit, updated_at);
                    this.addSensor(sensor);
                }
            });
            // Renderizar los sensores en la página
            this.render();
        } catch (error) {
            console.error("Error al cargar los sensores:", error);
        }
    }

    render() {
        const container = document.getElementById("sensor-container");
        container.innerHTML = ""; // Limpiar el contenido del contenedor
        this.sensors.forEach((sensor) => {
            // Crear una tarjeta para cada sensor y añadirla al contenedor
            const sensorCard = document.createElement("div");
            sensorCard.className = "column is-one-third";
            sensorCard.innerHTML = `
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Sensor ID: ${sensor.id}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p>
                                <strong>Tipo:</strong> ${sensor.type}
                            </p>
                            <p>
                               <strong>Valor:</strong> 
                               ${sensor.value} ${sensor.unit}
                            </p>
                        </div>
                        <time datetime="${sensor.updated_at}">
                            Última actualización: ${new Date(sensor.updated_at).toLocaleString()}
                        </time>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item update-button" data-id="${sensor.id}">Actualizar</a>
                    </footer>
                </div>
            `;
            container.appendChild(sensorCard);
        });

        // Añadir eventos de clic a los botones de actualización
        const updateButtons = document.querySelectorAll(".update-button");
        updateButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const sensorId = parseInt(button.getAttribute("data-id"));
                this.updateSensor(sensorId);
            });
        });
    }
}

// Crear una instancia de SensorManager y cargar los sensores desde el archivo JSON
const monitor = new SensorManager();
monitor.loadSensors("sensors.json");
