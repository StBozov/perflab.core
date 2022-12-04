export interface IApp {
    main(): void;
}

export class App implements IApp {
    public main(): void {

        const numToStrBlock = new NumberToStringBlock();
        const b1 = numToStrBlock.linkTo(new StringToArrBlock());
        const b2 = b1.linkTo(new ConsoleBlock());

        numToStrBlock.process(100);
    }
}


interface PipelineBlock<TIn, TOut> {
    process(input: TIn): void;
    linkTo<TNewOut>(block: PipelineBlock<TOut, TNewOut>): PipelineBlock<TOut, TNewOut>;
}

class NumberToStringBlock implements PipelineBlock<number, string>{
    private nextBlock: PipelineBlock<string, any> | undefined = undefined;
    process(input: number): void {
        const str = input.toString();
        this.nextBlock?.process(str);
    }
    linkTo<TNewOut>(block: PipelineBlock<string, TNewOut>): PipelineBlock<string, TNewOut> {
        this.nextBlock = block;
        return this.nextBlock;
    }
}

class StringToArrBlock implements PipelineBlock<string, string[]>{
    private nextBlock: PipelineBlock<string[], any> | undefined = undefined;
    process(input: string): void {
        const str = input.toString();
        this.nextBlock?.process([str]);
    }
    linkTo<TNewOut>(block: PipelineBlock<string[], TNewOut>): PipelineBlock<string[], TNewOut> {
        this.nextBlock = block;
        return this.nextBlock;
    }
}

class ConsoleBlock implements PipelineBlock<string[], void>{
    private nextBlock: PipelineBlock<void, any> | undefined = undefined;
    process(input: string[]): void {
        console.log(input);
    }
    linkTo<TNewOut>(block: PipelineBlock<void, TNewOut>): PipelineBlock<void, TNewOut> {
        this.nextBlock = block;
        return this.nextBlock;
    }
}