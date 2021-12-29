/*
Net - предоставляет асинхронный сетевой API для создания потоковых TCP или IPC-серверов
IPC support - Модуль net поддерживает IPC с именованными каналами в Windows и доменные сокеты Unix в других операционных системах.
Identifying paths for IPC connections

Class: net.BlockList - для указания правил отключения входящего или исходящего доступа к определенным IP-адресам, диапазонам IP-адресов или IP-подсетям
blockList.addAddress(address[, type])
blockList.addRange(start, end[, type])
blockList.addSubnet(net, prefix[, type])
blockList.check(address[, type])
blockList.rules

Class: net.SocketAddress
new net.SocketAddress([options])
socketaddress.address
socketaddress.family
socketaddress.flowlabel
socketaddress.port

Class: net.Server - используется для создания сервера TCP или IPC.
new net.Server([options][, connectionListener])
Event: 'close'
Event: 'connection'
Event: 'error'
Event: 'listening'
server.address()
server.close([callback])
server.getConnections(callback)
server.listen()
server.listen(handle[, backlog][, callback])
server.listen(options[, callback])
server.listen(path[, backlog][, callback])
server.listen([port[, host[, backlog]]][, callback])
server.listening
server.maxConnections
server.ref() - на ранее неочищенном сервере не позволит программе завершить работу, если это единственный оставшийся сервер (поведение по умолчанию)
server.unref() - позволит программе завершить работу, если это единственный активный сервер в системе событий

Class: net.Socket - может быть создан пользователем и использоваться непосредственно для взаимодействия с сервером
new net.Socket([options])
Event: 'close'
Event: 'connect'
Event: 'data'
Event: 'drain' - Выдается, когда буфер записи становится пустым. Может использоваться для ограничения загрузки
Event: 'end'
Event: 'error'
Event: 'lookup' - Выдается после resolving имени хоста, но перед подключением. Неприменимо к сокетам Unix.
Event: 'ready' -  socket is ready to be used.
Event: 'timeout' - Выдается, если время ожидания сокета истекло из-за бездействия
socket.address()
socket.bufferSize
socket.bytesRead
socket.bytesWritten
socket.connect()
socket.connect(options[, connectListener])
socket.connect(path[, connectListener])
socket.connect(port[, host][, connectListener])
socket.connecting
socket.destroy([error])
socket.destroyed
socket.end([data[, encoding]][, callback])
socket.localAddress
socket.localPort
socket.pause()
socket.pending
socket.ref() - для ранее не очищенного сокета не позволит программе завершить работу, если это единственный оставшийся сокет (поведение по умолчанию)
socket.remoteAddress
socket.remoteFamily
socket.remotePort
socket.resume()
socket.setEncoding([encoding])
socket.setKeepAlive([enable][, initialDelay])
socket.setNoDelay([noDelay])
socket.setTimeout(timeout[, callback])
socket.timeout
socket.unref()
socket.write(data[, encoding][, callback])
socket.readyState

net.connect() - Aliases to net.createConnection().
net.connect(options[, connectListener])
net.connect(path[, connectListener])
net.connect(port[, host][, connectListener])

net.createConnection() - создает новую сеть.Сокет, немедленно инициирует соединение с помощью socket.connect(), затем возвращает net.Socket, который запускает соединени
net.createConnection(options[, connectListener])
net.createConnection(path[, connectListener])
net.createConnection(port[, host][, connectListener])
net.createServer([options][, connectionListener])

net.isIP(input)
net.isIPv4(input)
net.isIPv6(input)
*/
