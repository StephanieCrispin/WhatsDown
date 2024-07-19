import { Modal, useMantineTheme } from "@mantine/core";

export default function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      opened={modalOpened}
      overlayOpacity={0.55}
      onClose={() => setModalOpened(false)}
      overlayBlur={3}
      size="50%"
    >
      {/* Modal content */}
      <form action="" className="infoForm">
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="FirsName"
            placeholder="First Name"
          />
          <input
            type="text"
            className="infoInput"
            name="LastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="WorksAt"
            placeholder="Works at"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIN"
            placeholder="Lives in"
          />
          <input
            type="text"
            className="infoInput"
            name="Country"
            placeholder="Country"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="Relationship Status"
            placeholder="Relationship Status"
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profleImg" />
          Cover Image
          <input type="file" name="coverImg" />
        </div>
        <button className="infoButton button">Update</button>
      </form>
    </Modal>
  );
}
