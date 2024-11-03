// Función para poblar la tabla con los registros
function populateTable(records) {
    const tbody = document.querySelector('#recordsTable tbody');
    tbody.innerHTML = ''; // Limpiar la tabla

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.Code}</td>
            <td>${record.Name}</td>
            <td>${record.Continent}</td>
            <td>${record.Region}</td>
            <td>${record.SurfaceArea}</td>
            <td>${record.Population}</td>
        `;
        tbody.appendChild(row);
    });
}

// Función para consultar todos los registros
function getAllRecords() {
    fetch('http://98.83.154.40/php-intro-connection/getRecords.php') // Cambia la URL según sea necesario
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Error al obtener los registros:', error);
            alert('Hubo un problema al obtener los registros. Revisa la conexión o la URL del servidor.');
        });
}

// Función para consultar registros por país
function getRecordsByCountry(country) {
    fetch(`http://3.91.87.142/php-intro-connection/getRecords.php?country=${encodeURIComponent(country)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Error al obtener los registros por país:', error);
            alert('Hubo un problema al obtener los registros por país.');
        });
}

// Función para consultar registros por continente
function getRecordsByContinent(continent) {
    fetch(`http://3.91.87.142/php-intro-connection/getRecords.php?continent=${encodeURIComponent(continent)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Error al obtener los registros por continente:', error);
            alert('Hubo un problema al obtener los registros por continente.');
        });
}

// Event Listeners para los botones de filtro
document.querySelector('#btnMiPais').addEventListener('click', () => {
    const country = prompt("Introduce el nombre del país que quieres consultar:");
    if (country) {
        getRecordsByCountry(country);
    }
});

document.querySelector('#btnMiContinente').addEventListener('click', () => {
    const continent = prompt("Introduce el nombre del continente que quieres consultar:");
    if (continent) {
        getRecordsByContinent(continent);
    }
});