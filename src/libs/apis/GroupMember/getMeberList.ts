import { GetMemberListProps } from '../../../types/GroupMember/memberType';
import { api } from '../../api';

const getMeberList = async ({
  groupId,
  sortType,
  page,
}: GetMemberListProps) => {
  const { data } = await api.get(
    `/rooms/${groupId}/members/${sortType === '최신순' ? 'NEW' : 'DICT'}?page=${page}`
  );

  return data;
};

export default getMeberList;