import dgram from 'dgram';
/*
UDP/datagram sockets - Модуль dgram обеспечивает реализацию сокетов дейтаграмм UDP.
Class: dgram.Socket
Event: 'close'
Event: 'connect'
Event: 'error'
Event: 'listening'
Event: 'message'
socket.addMembership(multicastAddress[, multicastInterface])
socket.addSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])
socket.address()
socket.bind([port][, address][, callback])
socket.bind(options[, callback])
socket.close([callback])
socket.connect(port[, address][, callback])
socket.disconnect()
socket.dropMembership(multicastAddress[, multicastInterface])
socket.dropSourceSpecificMembership(sourceAddress, groupAddress[, multicastInterface])
socket.getRecvBufferSize()
socket.getSendBufferSize()
socket.ref()
socket.remoteAddress()
socket.send(msg[, offset, length][, port][, address][, callback])
Note about UDP datagram size
socket.setBroadcast(flag)
socket.setMulticastInterface(multicastInterface)
Example: IPv6 outgoing multicast interface
Example: IPv4 outgoing multicast interface
Call results
socket.setMulticastLoopback(flag)
socket.setMulticastTTL(ttl)
socket.setRecvBufferSize(size)
socket.setSendBufferSize(size)
socket.setTTL(ttl)
socket.unref()
dgram module functions
dgram.createSocket(options[, callback])
dgram.createSocket(type[, callback])
*/
