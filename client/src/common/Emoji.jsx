import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { makeStyles } from '@material-ui/core';
import './Emoji.css';
const useStyles = makeStyles((theme) => {
  return {
    picker: { position: 'absolute', top: 0, left: 0 },
  };
});
export const Emoji = ({ onSelectEmoji }) => {
  const addEmoji = (emoji) => {
    if (onSelectEmoji) {
      onSelectEmoji(emoji);
    }
  };
  return (
    <>
      <Picker
        onClick={(_, event) => {
          event.stopPropagation();
        }}
        showPreview={false}
        title={null}
        emojiSize={22}
        native
        onSelect={addEmoji}
        style={{
          position: 'absolute',
          bottom: 57,
          left: -11,
        }}
      />
    </>
  );
};
