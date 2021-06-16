import React from "react";
import { RouterName } from "../../navigation/navigation.const";
import BasePage from "../BasePage";
import ProTable, {
  // createIntl,
  ProColumns,
} from "@ant-design/pro-table";
import { Button } from "antd";
import { connect } from "react-redux";
import withImmutablePropsToJS from "with-immutable-props-to-js";
import { AccountAction } from "../../actions";
import { getValueFromObjectByKeys } from "../../utils/utils.data";

// const enLocale = {
//   tableForm: {
//     search: "Query",
//     reset: "Reset",
//     submit: "Submit",
//     collapsed: "Expand",
//     expand: "Collapse",
//     inputPlaceholder: "Please enter",
//     selectPlaceholder: "Please select",
//   },
//   alert: {
//     clear: "Clear",
//   },
//   tableToolBar: {
//     leftPin: "Pin to left",
//     rightPin: "Pin to right",
//     noPin: "Unpinned",
//     leftFixedTitle: "Fixed the left",
//     rightFixedTitle: "Fixed the right",
//     noFixedTitle: "Not Fixed",
//     reset: "Reset",
//     columnDisplay: "Column Display",
//     columnSetting: "Settings",
//     fullScreen: "Full Screen",
//     exitFullScreen: "Exit Full Screen",
//     reload: "Refresh",
//     density: "Density",
//     densityDefault: "Default",
//     densityLarger: "Larger",
//     densityMiddle: "Middle",
//     densitySmall: "Compact",
//   },
// };

// Generate the intl object
// const enUSIntl = createIntl("vi_VN", enLocale);

const columns: ProColumns[] = [
  // {
  //   title: "Id",
  //   dataIndex: "_id",
  // },
  {
    title: "STT",
    dataIndex: "index",
    // valueType: 'indexBorder',
    valueType: "index",
  },
  {
    title: "Tài khoản",
    dataIndex: "username",
    copyable: true,
  },
  {
    title: "Mật khẩu",
    dataIndex: "password",
    valueType: "password",
    copyable: true,
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    valueType: "date",
  },
  {
    title: "Tùy chọn",
    valueType: "option",
    dataIndex: "id",
    render: (text, row, index, action) => [
      <Button
        key={index + "1"}
        onClick={() => {
          window.alert("Bạn muốn xóa？");
        }}
      >
        Xóa
      </Button>,
      <Button
        key={index + "2"}
        onClick={() => {
          window.alert("Bạn muốn cập nhật？");
        }}
        type={"primary"}
      >
        Cập nhật
      </Button>,
    ],
  },
];

interface IState {
  keywords?: string;
  data?: any[];
}

interface IProps {
  history?: any;
  getAllAccount?: any;
}

class Account extends BasePage<IProps, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.displayName = RouterName.Account;
    this.state = {
      keywords: "",
      data: [],
    };
  }

  _componentDidMount() {}

  renderContent() {
    const { keywords } = this.state;
    return (
      <ProTable<{}, {}>
        size="small"
        columns={columns}
        // key={"_id"}
        request={async ({ pageSize, current }, sort, filter) => {
          const data = await this.props.getAllAccount(current, pageSize);
          const dataA = getValueFromObjectByKeys(data, ["data", "data"]);
          const total = getValueFromObjectByKeys(data, ["data", "total"]);
          console.log(total);
          if (dataA) {
            return {
              data: dataA,
              total: total,
              success: true,
            };
          }
          return {
            data: [],
            total: 0,
            success: true,
          };
        }}
        // dataSource={data}
        rowKey={"_id"}
        params={{ keywords: keywords }}
        // toolBarRender={(action) => [
        //   <Input.Search
        //     style={{
        //       width: 200,
        //     }}
        //     onSearch={(value) => this.setStateSafe({ keywords: value })}
        //   />,
        // ]}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
          // total: 20,
          showSizeChanger: true,
          // pageSizeOptions: ["10", "20", "30"],
        }}
        headerTitle={"Danh sách tài khoản MXH"}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any, getState: any) => {
  return {
    getAllAccount: (page?: number, size?: number) => {
      return dispatch(AccountAction.getAllAccount(page, size));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withImmutablePropsToJS(Account));
