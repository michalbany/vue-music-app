export default {
    /**
     * Format time to minutes
     * @param time_in_seconds
     * @return formated_time_in_minutes
     */
    formatTime(time) {
        const minutes = Math.floor(time / 60) || 0
        const seconds = Math.round(time - minutes * 60) || 0

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
}