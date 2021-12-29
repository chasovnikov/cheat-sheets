const dns = require('dns');
/*
DNS - Модуль dns позволяет разрешать имена. Например, используйте его для поиска IP-адресов имен хостов.
Хотя он назван в честь Системы доменных имен (DNS), он не всегда использует протокол DNS для поиска. dns.lookup() использует средства операционной системы для выполнения разрешения имен. Возможно, ему не потребуется осуществлять какое-либо сетевое взаимодействие. Чтобы выполнить разрешение имен так, как это делают другие приложения в той же системе, используйте dns.lookup().

Class: dns.Resolver
Resolver([options])
resolver.cancel()
resolver.setLocalAddress([ipv4][, ipv6])
dns.getServers()
dns.lookup(hostname[, options], callback) - получение инфо о hostname
Supported getaddrinfo flags
dns.lookupService(address, port, callback)
dns.resolve(hostname[, rrtype], callback)
dns.resolve4(hostname[, options], callback)
dns.resolve6(hostname[, options], callback)
dns.resolveAny(hostname, callback)
dns.resolveCname(hostname, callback)
dns.resolveCaa(hostname, callback)
dns.resolveMx(hostname, callback)
dns.resolveNaptr(hostname, callback)
dns.resolveNs(hostname, callback)
dns.resolvePtr(hostname, callback)
dns.resolveSoa(hostname, callback)
dns.resolveSrv(hostname, callback)
dns.resolveTxt(hostname, callback)
dns.reverse(ip, callback)
dns.setDefaultResultOrder(order)
dns.setServers(servers)
DNS promises API
Class: dnsPromises.Resolver
resolver.cancel()
dnsPromises.getServers()
dnsPromises.lookup(hostname[, options])
dnsPromises.lookupService(address, port)
dnsPromises.resolve(hostname[, rrtype])
dnsPromises.resolve4(hostname[, options])
dnsPromises.resolve6(hostname[, options])
dnsPromises.resolveAny(hostname)
dnsPromises.resolveCaa(hostname)
dnsPromises.resolveCname(hostname)
dnsPromises.resolveMx(hostname)
dnsPromises.resolveNaptr(hostname)
dnsPromises.resolveNs(hostname)
dnsPromises.resolvePtr(hostname)
dnsPromises.resolveSoa(hostname)
dnsPromises.resolveSrv(hostname)
dnsPromises.resolveTxt(hostname)
dnsPromises.reverse(ip)
dnsPromises.setDefaultResultOrder(order)
dnsPromises.setServers(servers)
Error codes
Implementation considerations
dns.lookup()
dns.resolve(), dns.resolve*() and dns.reverse()
*/
