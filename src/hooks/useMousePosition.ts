import { onMounted, onUnmounted, ref } from "vue"

function useMousePosition() {
    const x = ref(0)
    const y = ref(0)

    const mouseOnclick = (e: MouseEvent) => {
      x.value = e.pageX
      y.value = e.pageY
    }
    onMounted(() => {
      // 捕捉鼠标事件并执行回调函数：
      document.addEventListener("click", mouseOnclick)
    })
    onUnmounted(() => {
      // 移除事件监听：
      document.removeEventListener("click", mouseOnclick)
    })

    return { x, y }
}

export default useMousePosition