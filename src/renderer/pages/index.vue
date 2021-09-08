<template>
  <div>
    <div style="height:120px;" />
    <v-row>
      <v-col cols="6">
        <v-text-field ref="findText" v-model="findText" label="alt + f" accesskey="f" />
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="replaceText" label="alt + r" accesskey="r" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-textarea v-model="originalText" label="alt + o" accesskey="o" />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col v-for="(item,index) in list" :key="index" cols="12">
            <v-card outlined @click="copyText(item)"><pre>{{ headStr(item) }}</pre></v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clipboard } from 'electron'

export default {
  data () {
    return {
      findText: '',
      replaceText: '',
      originalText: '',
      resultText: ''
    }
  },
  computed: {
    resultSprit () {
      return this.originalText.split('[¥r¥n]')
    },
    normal () {
      return this.resultSprit.map(line => {
        return line.split(this.findText).join(this.replaceText)
      }).join('¥n')
    },
    regExpText () {
      const reg = new RegExp(this.findText, 'g')
      return this.resultSprit.map(line => {
        return line.replace(reg, this.replaceText)
      }).join('¥n')
    },
    list () {
      return [this.normal, this.regExpText]
    }
  },
  methods: {
    headStr (value) {
      const limit = 100
      if (value.length >= limit) {
        return value.substring(0, limit) + '...'
      }
      return value
    },
    copyText (value) {
      clipboard.writeText(value)
    }
  }
}
</script>

<style></style>
