// node myfile.js 

const pendingTimers = []
const pendingOsTasks = []
const pendingOperations = []


// pseudo fn that indicate run the content of file 
// new timers , tasks, operations are recorded from content of the file 
myFile.runContent()

// some pseudo code like node check for event loop continuation 
function shouldContinue() {

    //  node will check 3 type of check to if event loop continue or exit program 

    // check one : any pending setTimeOut ,setInterval ,setImmediate 

    // check two : any pending OS task like server listening for http request on any port 

    // check three : any pending long running operation (like fs module) 

    return pendingTimers.length || pendingOsTasks.length || pendingOperations.length
}


// consider it is as an eventloop 
// entire body will be executed in one tick 
while (shouldContinue()) {

    //  body of event loop 
    // 1) node looks at pendingTimers and sees if any functions are ready to be called. setTimeout,setInterval

    // 2) node looks ate pendingOSTasks and pendingOperations and calls relevant callbacks 

    // 3) pause execution. continue when ... 
    //    - a new pendingOSTask is done 
    //    - a new pendingOperation is done 
    //    - a timer is about to complete 

    // 4) look at pendingTimers. call any setImmediate 

    // 5) Handle any 'close' events 
    /**
     * like close callback in readstream.on 
     * readStream.on('close',()=>{
     *  console.log('cleanup code')
     * })
     *  */

}


// exit back to terminal 