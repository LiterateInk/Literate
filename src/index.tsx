import 'virtual:uno.css';
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "@unocss/reset/tailwind.css";

/* @refresh reload */
import { render } from 'solid-js/web';
import AppRouter from './router';

render(() => <AppRouter />, document.getElementById("root")!);