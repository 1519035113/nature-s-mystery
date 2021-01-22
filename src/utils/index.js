//防抖
export function debounce(fn, wait) {
    let timer, timeStamp = 0
    let context, args
    let run = () => {
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
    let clean = () => {
        clearTimeout(timer)
    }
    return function () {
        context = this
        args = arguments
        let now = (new Date()).getTime()

        if (now - timeStamp < wait) {
            console.log('reset', now)

            clean()
            run()
        } else {
            console.log('set', now)
            run()
        }
        timeStamp = now
    }
}
// 节流
export function throttling(fn, wait) {
    let timer
    let context, args
    let run = () => {
        timer = setTimeout(() => {
            fn.apply(context, args)
            clearTimeout(timer)
            timer = null
        }, wait)
    }
    return function () {
        context = this
        args = arguments
        if (!timer) {
            console.log('throttle,set')
            run()
        } else {
            console.log('throttle,ignore')
        }
    }
}