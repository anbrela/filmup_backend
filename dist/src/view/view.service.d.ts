import { ViewRepository } from './view.repository';
import { ViewMovieDto } from './dto/viewMovie.dto';
export declare class ViewService {
    private viewRepository;
    constructor(viewRepository: ViewRepository);
    viewMovie(viewMovieDto: ViewMovieDto): Promise<void>;
}
