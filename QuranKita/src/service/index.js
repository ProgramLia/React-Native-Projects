// API-METHOD-FUNCTIONS...
async function get(param , idParam = '') {
     const response = await fetch(param  + idParam , {
          method:"GET",
     })
     const data = await response.json();
     return data
}

export {get}