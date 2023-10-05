import '@mui/material/styles';
import { EventsBackground, EventsColors, GrayShades } from 'src/theme/types';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    borderField: Palette['primary'];
    grayShades: GrayShades;
    eventsColors: EventsColors;
    eventsBackground: EventsBackground;
  }

  interface PaletteOptions {
    borderField: PaletteOptions['primary'];
    grayShades?: Partial<GrayShades>;
    eventsColors?: Partial<EventsColors>;
    eventsBackground?: Partial<EventsBackground>;
  }
}
