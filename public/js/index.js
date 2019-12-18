console.log('Clent Side javascript')

const input = document.getElementById('form')
const message_1 = document.getElementById('message-1')
const message_2 = document.getElementById('message-2')


const fetchValue =(e)=> {
        e.preventDefault()
        if(e.target.inp.value === ''){
            alert('Enter location')
        }else {
            message_1.textContent = "Loading..."
            fetch(`http://localhost:3000/weather?location=${e.target.inp.value}`)
                .then((response)=>{
                    return response.json()
                })
                .then((data)=>{
                    if(data.error){
                        console.log(data.error)
                    }else{
                        console.log(data)
                        message_1.textContent = `Temperature : ${data.temperature}`
                        message_2.textContent = data.summary
                    }
                })
        }
}

input.addEventListener('submit',fetchValue)


