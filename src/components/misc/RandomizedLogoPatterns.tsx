import { type Component, For } from "solid-js";

const PATTERNS = [
  () => <div class="flex-shrink-0 h-[45px] w-[160px] rounded-br-full rounded-tl-full bg-black" />,
  () => <div class="flex-shrink-0 h-[45px] w-[90px] rounded-bl-full rounded-tr-full bg-black" />,
  () => <div class="flex-shrink-0 h-[45px] w-[45px] rounded-full bg-black" />,
  () => <div class="flex-shrink-0 h-[45px] w-[140px] rounded-full rounded-bl-0 bg-black" />,
  () => <div class="flex-shrink-0 h-[45px] w-[100px] rounded-r-full bg-black" />,
];

const shuffle = <T,>(array: T[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array; 
}; 

const RandomizedLogoPatterns: Component = () => {
  return (
    <div class="w-full flex gap-2 overflow-x-hidden">
      <For each={shuffle(PATTERNS)}>{(Pattern) => <Pattern />}</For>
    </div>
  )
};

export default RandomizedLogoPatterns;
