import {
  ADD_LYRIC,
  ADD_LYRIC_SUCCESS,
  ALL_LYRICS,
  ALL_LYRICS_SUCCESS,
  DELETE_LYRIC,
  DELETE_LYRIC_SUCCESS
} from "./mutation-types";
import { RepositoryFactory } from "../repository/RepositoryFactory";
const LyricsRepository = RepositoryFactory.get("lyrics");

export const lyricActions = {
  async allLyrics({ commit }) {
    commit(ALL_LYRICS);
    const { data } = await LyricsRepository.get();
    commit(ALL_LYRICS_SUCCESS, data);
  },
  async addLyric({ commit }, payload) {
    commit(ADD_LYRIC);
    const { data } = await LyricsRepository.createLyric(payload);
    commit(ADD_LYRIC_SUCCESS, data);
  },
  async deleteLyric({ commit }, payload) {
    commit(DELETE_LYRIC);
    const { data } = await LyricsRepository.deleteLyric(payload);
    commit(DELETE_LYRIC_SUCCESS, payload);
  }
};
