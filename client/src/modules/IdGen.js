export function generateId(){
    var length = 20,
    allc = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    idgen = '';
    for (var i = 0; i < length; i++) {
      idgen += allc[Math.floor(Math.random() * allc.length)];
    }
    return idgen;
}