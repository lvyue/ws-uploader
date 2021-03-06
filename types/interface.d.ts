import { EventEmitter } from "events";
import { AxiosResponse } from "axios";

interface MyWorker {
    tasks: number;
    buzy: boolean;
    instance: Worker;
}

interface WorkerMessage {
    channel: string;
    payload?: any;
}

type WorkerMessages = [
    WorkerMessage,
    PostMessageOptions?
];

interface WorkersProvider extends EventEmitter {
    workers: MyWorker[];
    cpus: number;
    messages: WorkerMessages[];
    onmessage(e: MessageEvent): void;
    send(message: WorkerMessage, transfer?: PostMessageOptions): void;
    run(): void;
    destroy(): void;
    removeMessage(message: WorkerMessage): void;
    removeMessagesByChannel(channel: string): void;
}

interface QZFile {
    file: File;
    batch: string;
    blockSize: number;
    chunkSize: number;
    blocks: Block[];
    name: string;
    lastModified: number;
    ext: string;
    size: number;
    type: string;
    slice(start: number, end: number): Blob;
    getBlocks(): Block[];
    getBlockByIndex(index: number): Block;
}

interface HttpClient {
    post: <T>(props: HttpClientProps, extrnal1?: any) => Promise<AxiosResponse<T>>
}

interface QZFileProps {
    file: File;
    blockSize?: number;
    chunkSize?: number;
    batch?: string;
}

interface Block {
    startByte: number;
    endByte: number;
    file: QZFile;
    index: number;
    size: number;
    blob: Blob;
}

interface Chunk {
    startByte: number;
    endByte: number;
    size: number;
    block: Block;
    blob: Blob;
    index: number;
}

interface QETagBase {
    file: QZFile;
    hash: string;
    get?(): PromiseLike<string>;
    set(hash: string): void;
    getSync(): string;
}

interface QETagNormal extends QETagBase {
    concurrency: number;
}

interface QETagWorker extends QETagBase {
    channel: string;
    workers: WorkersProvider;
}

interface HttpClientProps {
    url: string;
    data: any;
    config?: object;
}
