import { DocumentData } from "firebase/firestore";
import dayjs from "dayjs";

interface ITest {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

class Test implements ITest{
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(id: string, data: DocumentData) {
    this.id = id
    this.name = data.name
    this.content = data.content

    const createdAt = dayjs(data.createdAt.toDate())
    const updatedAt = dayjs(data.updatedAt.toDate())

    this.createdAt = createdAt.format('DD/MM/YYYY [às] HH:mm:ss')
    this.updatedAt = updatedAt.format('DD/MM/YYYY [às] HH:mm:ss')
  }
}

export { Test }
export type { ITest }
