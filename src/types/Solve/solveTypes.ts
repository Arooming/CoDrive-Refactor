export interface CodeProps {
  newCode: string;
  stringId: string;
}

interface ChangeCodeFnProps {
  handleChangeCode: ({ newCode, stringId }: CodeProps) => void;
}

interface ChangeMemoFnProps {
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface ClickQuestionInfoProps {
  category: string;
  e?:
    | React.MouseEvent<HTMLLIElement, MouseEvent>
    | React.ChangeEvent<HTMLInputElement>;
  clickedValue?: string | Array<string>;
}

interface ClickQuestionInfoFnProps {
  handleClickQuestionInfo: ({ category, e }: ClickQuestionInfoProps) => void;
}

export interface CodeEditorProps extends ChangeCodeFnProps {
  stringId: string;
  code: string;
}

export interface MemoProps extends ChangeMemoFnProps {
  stringId: string;
  memo: string;
}

export interface HeaderTopProps extends ClickQuestionInfoFnProps {
  title: string;
}

export interface CodeSpaceHeaderProps extends ClickQuestionInfoFnProps {
  questionInfo: {
    title: string;
    tags: Array<string>;
    platform: string;
    problemUrl: string;
  };
}

export interface CodeSpaceProps
  extends CodeSpaceHeaderProps,
    ChangeCodeFnProps,
    ChangeMemoFnProps {
  ideItems: Array<{ id: number; code: string; memo: string }>;
  handleClickDeleteBtn: (id: number) => void;
}

export interface PageHeaderProps {
  questionInfo: {
    title: string;
    level: number;
    tags: Array<string>;
    platform: string;
    problemUrl: string;
  };

  codeblocks: Array<{ id: number; code: string; memo: string }>;
}

export interface HeaderBottomProps extends ClickQuestionInfoFnProps {
  questionInfo: {
    tags: Array<string>;
    platform: string;
    problemUrl: string;
  };
}
