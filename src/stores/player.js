import { defineStore } from 'pinia'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {}
  }),
  actions: {
    async newSong(song) {
      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()
    },
    async toggleAudio() {
      // if Howl object exists
      if (!this.sound.playing) {
        return
      }

      // pause or play
      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})
