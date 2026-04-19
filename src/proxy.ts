import { type NextRequest, NextResponse } from "next/server"

const statusEasterEggs: Record<number, string> = {
  100: "Continue. The server has received the request headers and the client should proceed to send the request body.",
  101: "Switching Protocols. The requester has asked the server to switch protocols and the server has agreed to do so.",
  102: "Processing. The server is processing the request, but no response is available yet.",
  103: "Early Hints. The server is likely to send a final response with the header fields included in the informational response.",
  200: "OK. The request has succeeded.",
  201: "Created. The request has been fulfilled and resulted in a new resource being created.",
  202: "Accepted. The request has been accepted for processing, but the processing has not been completed.",
  204: "No Content. The server successfully processed the request and is not returning any content.",
  205: "Reset Content. The server successfully processed the request, but is not returning any content and requires that the requester reset the document view.",
  206: "Partial Content. The server is delivering only part of the resource due to a range header sent by the client.",
  207: "Multi-Status. The message body that follows is an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.",
  208: "Already Reported. The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.",
  226: "IM Used. The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
  300: "Multiple Choices. The request has more than one possible response.",
  301: "Moved Permanently. The requested resource has been assigned a new permanent URI.",
  302: "Found. The requested resource resides temporarily under a different URI.",
  304: "Not Modified. The resource has not been modified since the last request.",
  307: "Temporary Redirect. The requested resource resides temporarily under a different URI and should be accessed using the original URI.",
  308: "Permanent Redirect. The requested resource has been assigned a new permanent URI and should be accessed using the new URI.",
  400: "Bad Request. Your client sent a request that this server could not understand.",
  401: "Unauthorized. You need to authenticate to access this resource.",
  402: "Payment Required. This status code is reserved for future use.",
  403: "Forbidden. You don't have permission to access this resource.",
  404: "Not Found. The requested resource could not be found on this server.",
  405: "Method Not Allowed. The method specified in the request is not allowed for the resource.",
  406: "Not Acceptable. The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.",
  407: "Proxy Authentication Required. You must authenticate with a proxy server before this request can be served.",
  408: "Request Timeout. Your client did not produce a request within the time that the server was prepared to wait.",
  409: "Conflict. The request could not be completed due to a conflict with the current state of the resource.",
  410: "Gone. The requested resource is no longer available on this server and there is no forwarding address.",
  411: "Length Required. The server refuses to accept the request without a defined Content-Length header.",
  412: "Precondition Failed. The precondition given in one or more of the request-header fields evaluated to false when it was tested on the server.",
  413: "Payload Too Large. The server is refusing to process a request because the request payload is larger than the server is willing or able to process.",
  414: "URI Too Long. The server is refusing to service the request because the request-target is longer than the server is willing to interpret.",
  415: "Unsupported Media Type. The server is refusing to service the request because the payload is in a format that is not supported by this server for this resource.",
  416: "Range Not Satisfiable. The client has asked for a portion of the file, but the server cannot supply that portion.",
  417: "Expectation Failed. The server cannot meet the requirements of the Expect request-header field.",
  418: "I'm a teapot. And proud of it.",
  421: "Misdirected Request. The request was directed at a server that is not able to produce a response.",
  422: "Unprocessable Entity. The request was well-formed but was unable to be followed due to semantic errors.",
  423: "Locked. The resource that is being accessed is locked.",
  424: "Failed Dependency. The request failed due to failure of a previous request.",
  425: "Too Early. The server is unwilling to risk processing a request that might be replayed.",
  426: "Upgrade Required. The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.",
  428: "Precondition Required. The origin server requires the request to be conditional.",
  429: "Too Many Requests. The user has sent too many requests in a given amount of time.",
  431: "Request Header Fields Too Large. The server is unwilling to process the request because its header fields are too large.",
  451: "Unavailable for legal reasons. Blame the lawyers.",
  500: "Internal Server Error. The server encountered an unexpected condition that prevented it from fulfilling the request.",
  502: "Bad Gateway. The server received an invalid response from the upstream server while trying to fulfill the request.",
  503: "Service Unavailable. The server is currently unable to handle the request due to temporary overload or maintenance.",
  504: "Gateway Timeout. The server did not receive a timely response from the upstream server while trying to fulfill the request.",
  505: "HTTP Version Not Supported. The server does not support the HTTP protocol version used in the request.",
  506: "Variant Also Negotiates. The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.",
  507: "Insufficient Storage. The server is unable to store the representation needed to complete the request.",
  508: "Loop detected. The call is coming from inside the house.",
  510: "Not Extended. Further extensions to the request are required for the server to fulfill it.",
  511: "Network Authentication Required. The client needs to authenticate to gain network access.",
}

export function proxy(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")
  if (q && statusEasterEggs[Number(q)]) {
    const code = Number(q)
    return new NextResponse(statusEasterEggs[code], {
      status: code,
      headers: { "content-type": "application/json" },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|llms).*)"],
}
