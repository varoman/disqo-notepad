import {Note} from '../note/note.model';

export interface Notepad {
	description: string;
	files: {[key: string]: Note};
}
