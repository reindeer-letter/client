import { Letter } from "@/types/letters";
import { CSSProperties } from "react";
import Mail from "./mail";
import FutureMail from "./futureMail";

const MailVirtualized = ({
  index,
  style,
  data,
}: {
  index: number;
  style: CSSProperties;
  data: Letter[];
}) => {
  return (
    <div style={style}>
      {!data[index].isDelivered && data[index].scheduledAt ? (
        <FutureMail
          key={data[index].id}
          scheduledAt={data[index].scheduledAt}
        />
      ) : (
        <Mail
          key={data[index].id}
          id={data[index].id}
          nickName={data[index].senderNickname}
          title={data[index].title}
          scheduledAt={data[index].scheduledAt}
          isOpen={data[index].isOpen}
        />
      )}
    </div>
  );
};

export default MailVirtualized;
