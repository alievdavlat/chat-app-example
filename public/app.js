let socket = io();
const wrapper = document.querySelector('.wrapper')
const chatForm = document.getElementById('chatForm')
const input = document.getElementById('message')
const container = document.querySelector('.container')
const name = prompt('ismingizni kirting')

const h3 = document.createElement('h3')
h3.textContent = name + ' ' + 'siz chatga kirdingiz'
container.appendChild(h3)
socket.emit('user-joined', {name})



socket.on('new-user-joined', data => {

  const h3 = document.createElement('h3')
  h3.textContent = data + ' ' + ' chatga kirdi'
  container.appendChild(h3)
})


chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const messageField = document.querySelector('.message-field')
  messageField.scrollHeight = messageField.clientHeight;
  messageField.style.cssText = 'display: flex;'

  const messageInput = chatForm['message'].value.trim()

  socket.emit('new-message', {
    name,
    message: messageInput
  })

  const div = document.createElement('div')
  div.setAttribute('class', 'san')

  const h5 = document.createElement('h5')
  h5.style.cssText = '  background: black; color: white; width: 200px; height: 40px; font-size: 18px; font-weight: 600;padding: 5px;border-radius: 10px;'
  h5.textContent = 'you :' + '  ' + `${messageInput}`


  div.appendChild(h5)
  messageField.appendChild(div)

  chatForm.reset()
})



socket.on('new-user-message', ({name, message}) => {
  const messageField = document.querySelector('.message-field')
  messageField.scrollHeight = messageField.clientHeight;
  messageField.style.cssText = 'display: flex;'

  const div = document.createElement('div')
  div.setAttribute('class', 'bowqasi')

  const h5 = document.createElement('h5')
  h5.style.cssText = '  background: black; color: white; width: 200px; height: 40px; font-size: 18px; font-weight: 600;padding: 5px;border-radius: 10px;'
  h5.textContent = name + ':' + ' ' + ` ${message}`


  div.appendChild(h5)
  messageField.appendChild(div)
})


input.addEventListener('input', e => {
 socket.emit('typing', {
  name,
  message : e.target.value
 } )
})


const h5  = document.createElement('h5')
socket.on('user-typing', ({name, message} )=> {
  h5.textContent = null

  h5.textContent = `${name}  yozvoti ...`
  wrapper.appendChild(h5)
  if (h5.textContent) {
  setTimeout(() => {
    h5.remove()
  }, 2000)

  }

})
