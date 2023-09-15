import { Injectable } from '@nestjs/common';
import { tmdbOptions } from './services/utils';

@Injectable()
export class TmdbService {
  async getMovie(movieId: number): Promise<any> {
    return await fetch(
      `${process.env.TMD_API_URL}/movie/${movieId}?language=es-Es`,
      tmdbOptions,
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async searchMovies(query: string): Promise<any> {
    return await fetch(
      `${process.env.TMD_API_URL}/search/movie?language=es-Es&query=${query}`,
      {
        ...tmdbOptions,
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async getPopularMovies(page?: number): Promise<any> {
    return await fetch(
      `${process.env.TMD_API_URL}/movie/popular?language=es-Es&page=${page}&region=ES`,
      {
        ...tmdbOptions,
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async getProviders(): Promise<any> {
    return await fetch(
      `${process.env.TMD_API_URL}/watch/providers/movie?language=es-Es&watch_region=ES`,
      {
        ...tmdbOptions,
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getDiscover = async ({ page, providers }) => {
    return await fetch(
      `${process.env.TMD_API_URL}/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc&watch_region=ES&with_watch_monetization_types=flatrate&with_watch_providers=${providers}`,
      {
        ...tmdbOptions,
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}
