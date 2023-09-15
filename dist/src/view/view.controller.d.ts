import { ViewService } from './view.service';
import { ViewMovieDto } from './dto/viewMovie.dto';
export declare class ViewController {
    private viewService;
    constructor(viewService: ViewService);
    viewMovie(viewMovieDto: ViewMovieDto): Promise<void>;
}
