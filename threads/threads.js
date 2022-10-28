const crypto = require('crypto')

function main() {
    const start = Date.now()
    // action 1
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('1: ', Date.now() - start)
    })


    // action 2
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('2: ', Date.now() - start)
    })

    /**
     *   The above scenario explanation 
     *   when we run these file all of the code execute one by one 
     *   but action 1 and 2 are expensive blocking io so it will be passed to libuv thread pool 
     *   so action 1 and 2 take almost same amount of time because of the libuv multithreading 
     */

    // action 2
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('3: ', Date.now() - start)
    })

    // action 2
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('4: ', Date.now() - start)
    })

    // action 2
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', (err, data) => {

        console.log('5: ', Date.now() - start)
    })

    /**
     *    action 1-4 will finish in almost same amount of time
     *    action 5 will take upto 2x time than previous 4 
     *    because libuv have 4 threads in thread pool as default 
     *    so first 4 will executed parallelly and the 5 the one execute on the next round 
     */

}


process.env.UV_THREADPOOL_SIZE = 2
/**
 *   the above variable is decide how many threads are going to be in libuv thread pool 
 *   in this case it is 2 
 *   so action 1,2 take almost same amount of time 
 *   action 3,4 take almost same time but upto 2x of 1st two
 *   action 5 take upt 4x time of 1st set 
 */
main()
