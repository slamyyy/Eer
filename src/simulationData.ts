import { CppLine, SimulationStep, NodeState } from './types';

export const cppCodeLines: CppLine[] = [
  { text: "#include <iostream>", desc: "تضمين مكتبة الإدخال والإخراج القياسية لطباعة المخرجات وقراءة المدخلات." },
  { text: "#include <string>", desc: "تضمين مكتبة النصوص للتعامل مع أسماء العقد والمسارات." },
  { text: "", desc: "سطر فارغ للهيكل والتنسيق." },
  { text: "using namespace std;", desc: "استخدام فضاء الأسماء القياسي std لتجنب كتابة std:: بشكل متكرر." },
  { text: "", desc: "سطر فارغ." },
  { text: "struct Edge {", desc: "تعريف هيكل الحافة (Edge): يمثل رابطاً موجهاً من عقدة إلى أخرى." },
  { text: "    string to;", desc: "اسم العقدة المستهدفة التي تؤدي إليها الحافة." },
  { text: "    double cost;", desc: "تكلفة العبور (الوزن) عبر هذه الحافة." },
  { text: "    Edge* next;", desc: "مؤشر للحافة التالية المنبثقة من نفس العقدة (قائمة متصلة للحواف)." },
  { text: "};", desc: "نهاية تعريف هيكل الحافة." },
  { text: "", desc: "سطر فارغ." },
  { text: "struct Node {", desc: "تعريف هيكل العقدة (Node): يمثل البيانات الكاملة والروابط لكل عقدة." },
  { text: "    string name;", desc: "اسم العقدة الفريد (مثل A, B, C, D)." },
  { text: "    double h;", desc: "قيمة Heuristic التقديرية للوصول للهدف." },
  { text: "    double g;", desc: "التكلفة الفعلية للوصول للعقدة من نقطة البداية." },
  { text: "    double f;", desc: "التكلفة الكلية المقدرة f = g + h." },
  { text: "    bool visited;", desc: "علامة لتحديد ما إذا تم زيارة وتأكيد هذه العقدة." },
  { text: "    string parent;", desc: "اسم العقدة الأب لتتبع واسترجاع المسار النهائي لاحقاً." },
  { text: "    Edge* edgesHead;", desc: "مؤشر لرأس القائمة المتصلة من الحواف الخارجة من هذه العقدة." },
  { text: "    Node* next;", desc: "مؤشر للعقدة التالية في القائمة العامة للعقد بالذاكرة." },
  { text: "};", desc: "نهاية تعريف هيكل العقدة." },
  { text: "", desc: "سطر فارغ." },
  { text: "void addNode(Node*& head, string name, double h) {", desc: "دالة لإضافة عقدة جديدة في نهاية القائمة العامة للعقد." },
  { text: "    Node* newNode = new Node;", desc: "حجز مساحة في الذاكرة العشوائية (Heap) لعقدة جديدة." },
  { text: "    newNode->name = name;", desc: "تعيين اسم العقدة الجديدة." },
  { text: "    newNode->h = h;", desc: "تعيين القيمة التقريبية (Heuristic)." },
  { text: "    newNode->g = 999.0;", desc: "تعيين قيمة g لتكون مالا نهاية افتراضياً (999.0)." },
  { text: "    newNode->f = 999.0;", desc: "تعيين التكلفة الكلية f لتكون مالا نهاية افتراضياً." },
  { text: "    newNode->visited = false;", desc: "تعيين حالة الزيارة لتكون غير مزارة بعد." },
  { text: "    newNode->parent = \"\";", desc: "تهيئة اسم العقدة الأب لتكون فارغة." },
  { text: "    newNode->edgesHead = nullptr;", desc: "تهيئة مؤشر قائمة الحواف إلى null." },
  { text: "    newNode->next = nullptr;", desc: "تهيئة مؤشر العقدة التالية إلى null." },
  { text: "", desc: "سطر فارغ." },
  { text: "    if (head == nullptr) {", desc: "التحقق إذا كانت القائمة العامة للعقد فارغة تماماً." },
  { text: "        head = newNode;", desc: "العقدة الجديدة تصبح هي رأس القائمة العامة (head)." },
  { text: "    } else {", desc: "إذا لم تكن فارغة، نمر عبر القائمة لإلحاقها بالنهاية." },
  { text: "        Node* temp = head;", desc: "استخدام مؤشر مؤقت للوقوف على رأس القائمة." },
  { text: "        while (temp->next != nullptr) {", desc: "التكرار عبر العقد حتى نصل للعقدة الأخيرة." },
  { text: "            temp = temp->next;", desc: "الانتقال للعقدة التالية بالذاكرة." },
  { text: "        }", desc: "نهاية حلقة التكرار." },
  { text: "        temp->next = newNode;", desc: "تحديث مؤشر العقدة الأخيرة ليشير إلى العقدة الجديدة." },
  { text: "    }", desc: "إغلاق جملة الشرط." },
  { text: "}", desc: "نهاية دالة addNode." },
  { text: "", desc: "سطر فارغ." },
  { text: "Node* findNode(Node* head, string name) {", desc: "دالة مساعدة للبحث عن عقدة بالاسم داخل القائمة المتصلة." },
  { text: "    Node* temp = head;", desc: "بدء التتبع والبحث من رأس القائمة." },
  { text: "    while (temp != nullptr) {", desc: "تكرار طالما لم نصل لنهاية الذاكرة المحجوزة للعقد." },
  { text: "        if (temp->name == name) return temp;", desc: "إذا تطابق الاسم، نرجع مؤشر العقدة فوراً." },
  { text: "        temp = temp->next;", desc: "الانتقال للعقدة التالية بالذاكرة." },
  { text: "    }", desc: "إغلاق الحلقة." },
  { text: "    return nullptr;", desc: "إرجاع null في حال لم يعثر على العقدة." },
  { text: "}", desc: "نهاية دالة findNode." },
  { text: "", desc: "سطر فارغ." },
  { text: "void addEdge(Node* head, string from, string to, double cost) {", desc: "دالة لإضافة حافة موجهة وتكلفة العبور بين عقدتين." },
  { text: "    Node* fromNode = findNode(head, from);", desc: "البحث عن عقدة المنطلق للحصول على عنوانها." },
  { text: "    if (fromNode == nullptr) return;", desc: "إذا كانت عقدة المنطلق غير موجودة بالذاكرة، نلغي العملية." },
  { text: "", desc: "سطر فارغ." },
  { text: "    Edge* newEdge = new Edge;", desc: "إنشاء بنية Edge جديدة بالذاكرة وحجز عنوان لها." },
  { text: "    newEdge->to = to;", desc: "تحديد اسم عقدة المقصد للحافة." },
  { text: "    newEdge->cost = cost;", desc: "تعيين تكلفة الانتقال (cost)." },
  { text: "    newEdge->next = nullptr;", desc: "تعيين المؤشر التالي للحافة الجديدة ليساوي null." },
  { text: "", desc: "سطر فارغ." },
  { text: "    if (fromNode->edgesHead == nullptr) {", desc: "التحقق مما إذا كانت العقدة لا تمتلك أي حواف سابقة." },
  { text: "        fromNode->edgesHead = newEdge;", desc: "تصبح الحافة الجديدة هي رأس قائمة حواف هذه العقدة." },
  { text: "    } else {", desc: "إذا كانت تمتلك حوافاً سابقة، نلحق الحافة بنهايتها." },
  { text: "        Edge* temp = fromNode->edgesHead;", desc: "استخدام مؤشر مؤقت لرأس الحواف." },
  { text: "        while (temp->next != nullptr) {", desc: "التكرار للوصول إلى آخر حافة مضافة." },
  { text: "            temp = temp->next;", desc: "الانتقال للحافة التالية." },
  { text: "        }", desc: "نهاية حلقة تتبع الحواف." },
  { text: "        temp->next = newEdge;", desc: "ربط الحافة الأخيرة بالحافة المضافة حديثاً." },
  { text: "    }", desc: "نهاية جملة الشرط." },
  { text: "}", desc: "نهاية دالة addEdge." },
  { text: "", desc: "سطر فارغ." },
  { text: "void printPathRecursive(Node* head, string currentName, string startName) {", desc: "دالة لاسترجاع المسار المكتشف وطباعته بشكل متداخل تراجعياً." },
  { text: "    if (currentName == \"\") return;", desc: "إذا وصلنا لنهاية التتبع (عقدة الأب خالية)، نخرج تراجعياً." },
  { text: "    Node* currNode = findNode(head, currentName);", desc: "البحث عن بيانات العقدة الحالية." },
  { text: "    if (currNode == nullptr) return;", desc: "إذا لم نجد العقدة بالذاكرة، نخرج تراجعياً." },
  { text: "", desc: "سطر فارغ." },
  { text: "    printPathRecursive(head, currNode->parent, startName);", desc: "استدعاء ذاتي (Recursive) لعقدة الأب حتى نصل لعقدة البداية." },
  { text: "", desc: "سطر فارغ." },
  { text: "    if (currentName == startName) {", desc: "عند الوصول لأول عقدة بالمسار وهي عقدة البداية." },
  { text: "        cout << currentName;", desc: "طباعة اسم عقدة الانطلاق." },
  { text: "    } else {", desc: "طباعة الأسهم للعقد الوسطية والهدف." },
  { text: "        cout << \" --> \" << currentName;", desc: "طباعة سهم يشير إلى اسم العقدة المزارة." },
  { text: "    }", desc: "نهاية جملة الشرط لطباعة المسار." },
  { text: "}", desc: "نهاية دالة طباعة المسار التراجعي." },
  { text: "", desc: "سطر فارغ." },
  { text: "Node* getSmallestFNode(Node* head) {", desc: "دالة لاختيار العقدة غير المزارة التي تملك أصغر تكلفة كلية f." },
  { text: "    Node* smallest = nullptr;", desc: "تهيئة مؤشر العقدة المختارة ليكون null." },
  { text: "    double min_f = 999.0;", desc: "تحديد أصغر قيمة كبداية وهي القيمة الافتراضية الكبيرة (999.0)." },
  { text: "    Node* temp = head;", desc: "البدء بالبحث من رأس قائمة العقد." },
  { text: "    ", desc: "فراغ تجميلي." },
  { text: "    while (temp != nullptr) {", desc: "المرور على كافة العقد بالذاكرة العامة." },
  { text: "        if (!temp->visited && temp->f < min_f) {", desc: "التحقق من أن العقدة لم تزر بعد، وأن قيمة f لها أصغر من min_f الحالية." },
  { text: "            min_f = temp->f;", desc: "تحديث أصغر قيمة f مسجلة." },
  { text: "            smallest = temp;", desc: "حفظ مؤشر العقدة كأفضل خيار حالي." },
  { text: "        }", desc: "نهاية جملة التحقق." },
  { text: "        temp = temp->next;", desc: "الانتقال للعقدة التالية بالذاكرة." },
  { text: "    }", desc: "نهاية حلقة الفحص لجميع العقد." },
  { text: "    return smallest;", desc: "إرجاع مؤشر العقدة ذات أصغر قيمة f المستهدفة." },
  { text: "}", desc: "نهاية دالة getSmallestFNode." },
  { text: "", desc: "سطر فارغ." },
  { text: "void updateNeighbors(Node* head, Node* current) {", desc: "دالة تفحص حواف العقدة الحالية وتحديث قيم f و g لجيرانها." },
  { text: "    Edge* edgeTemp = current->edgesHead;", desc: "البدء من رأس قائمة الحواف الخارجة من العقدة الحالية." },
  { text: "    while (edgeTemp != nullptr) {", desc: "المرور على كافة الحواف المتاحة لهذه العقدة." },
  { text: "        Node* neighborNode = findNode(head, edgeTemp->to);", desc: "إيجاد عنوان عقدة الجار بالبحث بالاسم." },
  { text: "        if (neighborNode != nullptr && !neighborNode->visited) {", desc: "التحقق من وجود الجار وأنه لم يزر مسبقاً لحمايته من الدوران اللانهائي." },
  { text: "            double new_g = current->g + edgeTemp->cost;", desc: "حساب التكلفة الجديدة g للوصول للجار عبر العقدة الحالية." },
  { text: "            if (new_g < neighborNode->g) {", desc: "إذا كانت التكلفة المكتشفة حديثاً أصغر من التكلفة g السابقة للجار." },
  { text: "                neighborNode->g = new_g;", desc: "تحديث التكلفة g للجار بالقيمة الأفضل الأقصر." },
  { text: "                neighborNode->f = neighborNode->g + neighborNode->h;", desc: "إعادة حساب التكلفة الكلية f للجار بجمع g الجديدة مع h الخاصة به." },
  { text: "                neighborNode->parent = current->name;", desc: "تحديث الأب للجار ليشير إلى العقدة الحالية التي وفرت الطريق الأفضل." },
  { text: "            }", desc: "نهاية شرط تحسين التكلفة." },
  { text: "        }", desc: "نهاية التحقق من فعالية العقدة الجارة." },
  { text: "        edgeTemp = edgeTemp->next;", desc: "الانتقال للحافة التالية للعقدة الحالية." },
  { text: "    }", desc: "نهاية حلقة المرور على الجيران." },
  { text: "}", desc: "نهاية دالة تحديث الجيران." },
  { text: "", desc: "سطر فارغ." },
  { text: "void runAStar(Node* head, string startName, string goalName, int numNodes) {", desc: "دالة التحكم في خوارزمية A* بالكامل والبحث خطوة بخطوة." },
  { text: "    Node* startNode = findNode(head, startName);", desc: "البحث عن عقدة البداية لتهيئة حالتها." },
  { text: "    if (startNode != nullptr) {", desc: "التحقق من وجود عقدة البداية بالذاكرة." },
  { text: "        startNode->g = 0;", desc: "ضبط قيمة g للانطلاق لتساوي 0." },
  { text: "        startNode->f = startNode->h;", desc: "تصبح قيمة f للبداية مساوية لقيمة h الخاصة بها." },
  { text: "    }", desc: "نهاية تهيئة البداية." },
  { text: "", desc: "سطر فارغ." },
  { text: "    for (int step = 0; step < numNodes; step++) {", desc: "تكرار بعدد العقد كحد أقصى للبحث بالترتيب." },
  { text: "        Node* current = getSmallestFNode(head);", desc: "استدعاء دالة اختيار العقدة الأفضل f لاستكشافها الآن." },
  { text: "", desc: "سطر فارغ." },
  { text: "        if (current == nullptr || current->name == goalName) {", desc: "إذا لم نجد عقدة صالحة، أو كان الأفضل هو هدفنا النهائي، نتوقف فوراً." },
  { text: "            break;", desc: "الخروج من حلقة التكرار لوصولنا للهدف أو انتهاء الخيارات." },
  { text: "        }", desc: "نهاية شرط التوقف." },
  { text: "", desc: "سطر فارغ." },
  { text: "        current->visited = true;", desc: "تأكيد زيارة وإغلاق العقدة الحالية وضمها للـ Closed Set." },
  { text: "        updateNeighbors(head, current);", desc: "تحديث قيم التكاليف f و g لجميع جيران العقدة المستكشفة حالياً." },
  { text: "    }", desc: "نهاية حلقة الخطوات." },
  { text: "}", desc: "نهاية دالة runAStar." },
  { text: "", desc: "سطر فارغ." },
  { text: "int main() {", desc: "نقطة البداية لبرنامج C++ عند بدء التشغيل." },
  { text: "    int numNodes;", desc: "المتغير المخصص لحفظ عدد العقد الإجمالي." },
  { text: "    cout << \"Enter the total number of nodes: \";", desc: "طباعة نص لطلب إدخال عدد العقد." },
  { text: "    cin >> numNodes;", desc: "استقبال عدد العقد المدخل من المستخدم." },
  { text: "    Node* nodesHead = nullptr;", desc: "رأس القائمة المتصلة للعقد في الذاكرة (يبدأ فارغاً)." },
  { text: "    string startName, goalName;", desc: "متغيرات لحفظ اسم البداية والنهاية." },
  { text: "    cout << \"\\n--- Input Node Names and Heuristic values (h) ---\" << endl;", desc: "طباعة ترويسة إدخال العقد وقيم h." },
  { text: "    for (int i = 0; i < numNodes; i++) {", desc: "حلقة تكرارية لإدخال العقد واحدة تلو الأخرى." },
  { text: "        string name;", desc: "متغير لحفظ اسم العقدة المؤقت." },
  { text: "        double h_val;", desc: "متغير لحفظ قيمة Heuristic المؤقتة." },
  { text: "        cout << \"Node \" << i + 1 << \" name: \";", desc: "طلب اسم العقدة بالترتيب." },
  { text: "        cin >> name;", desc: "استقبال الاسم." },
  { text: "        cout << \"Heuristic (h) for \" << name << \": \";", desc: "طلب قيمة h للعقدة." },
  { text: "        cin >> h_val;", desc: "استقبال قيمة h لعقدة المقارنة." },
  { text: "        addNode(nodesHead, name, h_val);", desc: "استدعاء دالة إضافة العقدة إلى القائمة المتصلة." },
  { text: "        if (i == 0) startName = name;", desc: "العقدة الأولى المدخلة تعتبر تلقائياً نقطة البداية." },
  { text: "        if (i == numNodes - 1) goalName = name;", desc: "العقدة الأخيرة تعتبر تلقائياً نقطة الهدف." },
  { text: "    }", desc: "إغلاق حلقة إدخال العقد." },
  { text: "    cout << \"\\n--- Input Edge Transitions and Costs (g) ---\" << endl;", desc: "طباعة ترويسة إدخال الطرق والتكاليف." },
  { text: "    while (true) {", desc: "حلقة مستمرة حتى يقرر المستخدم الخروج بالكتابة." },
  { text: "        string from, to;", desc: "تخزين أسماء عقد البداية والنهاية للطريق الموجه." },
  { text: "        double cost;", desc: "حفظ تكلفة العبور للطريق." },
  { text: "        cout << \"From Node (type 'exit' to stop): \";", desc: "طلب العقدة المصدر." },
  { text: "        cin >> from;", desc: "استقبال القيمة." },
  { text: "        if (from == \"exit\") break;", desc: "إذا كتب المستخدم exit نخرج من تكرار إدخال الطرق." },
  { text: "        cout << \"To Node: \";", desc: "طلب عقدة الوجهة." },
  { text: "        cin >> to;", desc: "استقبال الوجهة." },
  { text: "        cout << \"Cost: \";", desc: "طلب التكلفة." },
  { text: "        cin >> cost;", desc: "استقبال التكلفة الفعلية." },
  { text: "        addEdge(nodesHead, from, to, cost);", desc: "استدعاء دالة إضافة الرابط بين العقدتين بالذاكرة." },
  { text: "    }", desc: "إغلاق حلقة إدخال الطرق." },
  { text: "    runAStar(nodesHead, startName, goalName, numNodes);", desc: "تشغيل خوارزمية A* بالكامل على رأس القائمة." },
  { text: "    Node* goalNode = findNode(nodesHead, goalName);", desc: "البحث عن عقدة الهدف بالذاكرة لقراءة النتائج النهائية." },
  { text: "    cout << \"\\n--- Final Optimal Path Results ---\" << endl;", desc: "طباعة ترويسة المخرجات والنتائج النهائية." },
  { text: "    if (goalNode == nullptr || goalNode->g == 999.0) {", desc: "التحقق مما إذا كان هناك مسار واصل للهدف." },
  { text: "        cout << \"No path found to the goal.\" << endl;", desc: "طباعة رسالة تعذر العثور على مسار مناسب." },
  { text: "    } else {", desc: "إذا تم العثور على المسار بنجاح." },
  { text: "        cout << \"Optimal Path: \";", desc: "طباعة العبارة التمهيدية للمسار الأقصر." },
  { text: "        printPathRecursive(nodesHead, goalName, startName);", desc: "استدعاء دالة الطباعة التراجعية لطباعة العقد المكونة للمسار." },
  { text: "        cout << endl;", desc: "سطر جديد بالكونسول للترتيب البصري للمخرجات." },
  { text: "        cout << \"Total Cost (g): \" << goalNode->g << endl;", desc: "طباعة التكلفة الفعلية الكاملة للوصول إلى الهدف وهي 5." },
  { text: "    }", desc: "إغلاق جملة الشرط للمخرجات." },
  { text: "    return 0;", desc: "إرجاع 0 لنظام التشغيل دلالة على نجاح البرنامج وانتهاء تنفيذه." },
  { text: "}", desc: "نهاية دالة main وإغلاق البرنامج." }
];

// Helper interface to represent state changes step-by-step
interface StateAction {
  line: number;
  explanation: string;
  terminal?: string;
  activeNode?: string | null;
  activeNeighbors?: string[];
  highlightedEdge?: { from: string; to: string } | null;
  updateNodes?: Array<{
    name: string;
    h?: number;
    g?: number;
    f?: number;
    visited?: boolean;
    parent?: string;
    edges?: Array<{ to: string; cost: number }>;
  }>;
  optimalPath?: string[];
  phase: 'init' | 'edges' | 'search' | 'reconstruct' | 'done';
}

const traceActions: StateAction[] = [
  // MAIN START
  { line: 137, explanation: "بدء تنفيذ برنامج C++ من دالة main() الرئيسية.", phase: 'init' },
  { line: 138, explanation: "تعريف متغير numNodes لحفظ عدد العقد الإجمالي.", phase: 'init' },
  { line: 139, explanation: "طباعة رسالة لطلب إدخال عدد العقد الإجمالي.", phase: 'init' },
  { line: 140, explanation: "محاكاة قراءة عدد العقد من المستخدم. تم تعيين القيمة إلى 4.", terminal: "Enter the total number of nodes: 4", phase: 'init' },
  { line: 141, explanation: "إنشاء مؤشر nodesHead للإشارة إلى رأس القائمة المتصلة للعقد ممهداً بـ nullptr.", phase: 'init' },
  { line: 142, explanation: "تعريف المتغيرات النصية startName و goalName لتخزين نقطتي البداية والنهاية.", phase: 'init' },
  { line: 143, explanation: "طباعة عنوان قسم إدخال أسماء العقد وقيم Heuristic التقديرية (h).", terminal: "\n--- Input Node Names and Heuristic values (h) ---", phase: 'init' },
  
  // NODE A CREATION
  { line: 144, explanation: "بدء حلقة التكرار لإدخال بيانات العقد الأربع. دورة i = 0 من أجل العقدة الأولى.", phase: 'init' },
  { line: 145, explanation: "تعريف متغير name مؤقتاً لتخزين اسم العقدة الحالية.", phase: 'init' },
  { line: 146, explanation: "تعريف متغير h_val مؤقتاً لتخزين قيمة Heuristic للعقدة.", phase: 'init' },
  { line: 147, explanation: "طباعة رسالة تطلب اسم العقدة رقم 1.", phase: 'init' },
  { line: 148, explanation: "قراءة اسم العقدة الأولى: تم إدخال 'A'.", terminal: "Node 1 name: A", phase: 'init' },
  { line: 149, explanation: "طباعة رسالة لطلب قيمة Heuristic التقريبية (h) للمسافة من A إلى الهدف (D).", phase: 'init' },
  { line: 150, explanation: "قراءة قيمة h المحددة للعقدة A: تم إدخال '6'.", terminal: "Heuristic (h) for A: 6", phase: 'init' },
  { line: 151, explanation: "استدعاء دالة addNode لإضافة العقدة 'A' بقيمة h=6 إلى الذاكرة.", phase: 'init' },
  // inside addNode A
  { line: 22, explanation: "دخول دالة addNode لتخصيص كائن جديد بالذاكرة العشوائية (RAM).", phase: 'init' },
  { line: 23, explanation: "تنفيذ دالة heap allocation عبر كلمة new Node لحجز كتلة ذاكرة للعقدة A وتسمية مؤشرها بـ newNode.", updateNodes: [{ name: 'A', h: 6, g: 999, f: 999, visited: false, parent: '', edges: [] }], phase: 'init' },
  { line: 24, explanation: "تعيين اسم العقدة newNode->name ليساوي 'A'.", phase: 'init' },
  { line: 25, explanation: "تعيين القيمة التقريبية newNode->h من معامل h المار بالدالة (6).", phase: 'init' },
  { line: 26, explanation: "تهيئة تكلفة البداية newNode->g بـ 999.0 كقيمة افتراضية للمالا نهاية.", phase: 'init' },
  { line: 27, explanation: "تهيئة التكلفة الكلية newNode->f بـ 999.0 كقيمة افتراضية للمالا نهاية.", phase: 'init' },
  { line: 28, explanation: "تعيين حالة الزيارة newNode->visited للوضع false كعقدة مجهولة المعالم.", phase: 'init' },
  { line: 29, explanation: "تهيئة اسم الأب newNode->parent لنص فارغ.", phase: 'init' },
  { line: 30, explanation: "تهيئة مؤشر رأس الحواف newNode->edgesHead بالقيمة nullptr لغياب العلاقات حالياً.", phase: 'init' },
  { line: 31, explanation: "تهيئة مؤشر العقدة التالية newNode->next بالقيمة nullptr كعقدة مستقلة بالذاكرة.", phase: 'init' },
  { line: 33, explanation: "فحص الشرط (head == nullptr)؟ نعم، القائمة فارغة حالياً ومؤشر nodesHead يشير إلى null لعدم إضافة عقد سابقة.", phase: 'init' },
  { line: 34, explanation: "إسناد newNode إلى head. الآن head في الدالة (nodesHead في main) يشير للعقدة A.", phase: 'init' },
  { line: 42, explanation: "اكتمال دالة addNode والرجوع لمتابعة تنفيذ main.", phase: 'init' },
  // back in main after A
  { line: 152, explanation: "التحقق من الشرط (i == 0)؟ نعم، i قيمتها 0، لذا يتم إسناد 'A' إلى startName كعقدة الانطلاق الرئيسية.", phase: 'init' },
  { line: 153, explanation: "التحقق من كونها العقدة الأخيرة (i == numNodes - 1)؟ لا (0 != 3)، يتم تجاوز هذا السطر.", phase: 'init' },
  { line: 154, explanation: "نهاية الدورة الأولى من حلقة الإدخال والتأهب لتكرار العداد وزيادة i إلى 1.", phase: 'init' },

  // NODE B CREATION
  { line: 144, explanation: "حلقة التكرار تتابع: دورة i = 1 لإدخال العقدة الثانية.", phase: 'init' },
  { line: 147, explanation: "طلب اسم العقدة رقم 2.", phase: 'init' },
  { line: 148, explanation: "قراءة اسم العقدة الثانية: تم إدخال 'B'.", terminal: "Node 2 name: B", phase: 'init' },
  { line: 149, explanation: "طلب إدخال القيمة h للعقدة B.", phase: 'init' },
  { line: 150, explanation: "قراءة قيمة h للعقدة B: تم إدخال '4'.", terminal: "Heuristic (h) for B: 4", phase: 'init' },
  { line: 151, explanation: "استدعاء دالة addNode لإضافة 'B' بقيمة h=4.", phase: 'init' },
  // inside addNode B
  { line: 22, explanation: "دخول دالة addNode للعقدة B.", phase: 'init' },
  { line: 23, explanation: "حجز كتلة ذاكرة جديدة بالكامل للعقدة B بالـ Heap وتوجيه newNode نحوها.", updateNodes: [{ name: 'B', h: 4, g: 999, f: 999, visited: false, parent: '', edges: [] }], phase: 'init' },
  { line: 24, explanation: "تعيين الاسم 'B' للعقدة الجديدة.", phase: 'init' },
  { line: 25, explanation: "تعيين Heuristic h = 4 للعقدة B.", phase: 'init' },
  { line: 26, explanation: "تهيئة f و g بالقيم الافتراضية مالا نهاية.", phase: 'init' },
  { line: 33, explanation: "فحص الشرط (head == nullptr)؟ لا، head ليس null بل يشير للعقدة A المصممة سابقاً.", phase: 'init' },
  { line: 36, explanation: "الانتقال لقسم الـ else لقراءة القائمة حتى نهايتها وإلحاق العقدة الجديدة.", phase: 'init' },
  { line: 37, explanation: "تعريف مؤشر تتبع مؤقت temp يساوي head (A) للتحرك بالقائمة دون خسارة العنوان الرئيسي.", phase: 'init' },
  { line: 38, explanation: "التحقق من حلقة التكرار (temp->next != nullptr)؟ لا، A->next يساوي null لأنها أول وآخر عقدة بالقائمة مسبقاً.", phase: 'init' },
  { line: 41, explanation: "إسناد newNode (عنوان العقدة B) في مؤشر temp->next لتصبح العقدة B مربوطة بعد العقدة A مباشرة بالذاكرة.", phase: 'init' },
  { line: 42, explanation: "الخروج من دالة addNode للعقدة B والعودة للدالة الرئيسية.", phase: 'init' },
  // back in main after B
  { line: 152, explanation: "فحص (i == 0)؟ لا، i = 1، لا يتم تعديل startName.", phase: 'init' },
  { line: 153, explanation: "فحص هل هي العقدة الأخيرة؟ (1 != 3)، تخطي السطر.", phase: 'init' },
  { line: 154, explanation: "زيادة العداد i إلى 2.", phase: 'init' },

  // NODE C CREATION
  { line: 144, explanation: "دورة حلقة الإدخال i = 2 للعقدة الثالثة.", phase: 'init' },
  { line: 147, explanation: "طلب اسم العقدة رقم 3.", phase: 'init' },
  { line: 148, explanation: "قراءة اسم العقدة الثالثة: تم إدخال 'C'.", terminal: "Node 3 name: C", phase: 'init' },
  { line: 149, explanation: "طلب قيمة h للوصول للهدف من C.", phase: 'init' },
  { line: 150, explanation: "قراءة h العقدة C وهي 2.", terminal: "Heuristic (h) for C: 2", phase: 'init' },
  { line: 151, explanation: "استدعاء addNode لإضافة 'C' بقيمة h=2.", phase: 'init' },
  // inside addNode C
  { line: 22, explanation: "دخول addNode لإضافة العقدة C.", phase: 'init' },
  { line: 23, explanation: "تخصيص الذاكرة للعقدة C وتوجيه newNode.", updateNodes: [{ name: 'C', h: 2, g: 999, f: 999, visited: false, parent: '', edges: [] }], phase: 'init' },
  { line: 37, explanation: "بدء التتبع من الرأس temp = head (العقدة A).", phase: 'init' },
  { line: 38, explanation: "المرور بالحلقة: فحص هل لـ A عقدة تالية تليها بالذاكرة؟ نعم (next هو B وليس null).", phase: 'init' },
  { line: 39, explanation: "الانتقال للامام temp = temp->next. الآن temp يوجه نحو العقدة B.", phase: 'init' },
  { line: 38, explanation: "تكرار الفحص: هل لـ B عقدة تالية بالذاكرة؟ لا، B->next حالياً null.", phase: 'init' },
  { line: 41, explanation: "ربط العقدة C بنهاية القائمة بجعل مؤشر B->next يشير إلى العقدة C.", phase: 'init' },
  { line: 42, explanation: "العودة للدالة الرئيسية.", phase: 'init' },
  // back after C
  { line: 154, explanation: "تحديث قيمة العداد i لتصل لـ 3.", phase: 'init' },

  // NODE D CREATION
  { line: 144, explanation: "دورة حلقة الإدخال الأخيرة i = 3 للعقدة الرابعة والأخيرة.", phase: 'init' },
  { line: 147, explanation: "طلب اسم العقدة رقم 4.", phase: 'init' },
  { line: 148, explanation: "قراءة الاسم: تم إدخال 'D'.", terminal: "Node 4 name: D", phase: 'init' },
  { line: 149, explanation: "طلب قيمة Heuristic h للهدف نفسه (العقدة D).", phase: 'init' },
  { line: 150, explanation: "قيمة h لـ D هي 0 لأنها هي الهدف نفسه ولا توقعات إضافية للمسافة.", terminal: "Heuristic (h) for D: 0", phase: 'init' },
  { line: 151, explanation: "استدعاء addNode لإضافة 'D' بقيمة h=0.", phase: 'init' },
  // inside addNode D
  { line: 22, explanation: "دخول addNode لإضافة العقدة الأخيرة D.", phase: 'init' },
  { line: 23, explanation: "تخصيص الذاكرة للعقدة D وتوجيه newNode.", updateNodes: [{ name: 'D', h: 0, g: 999, f: 999, visited: false, parent: '', edges: [] }], phase: 'init' },
  { line: 37, explanation: "بدء التتبع من temp = head (العقدة A).", phase: 'init' },
  { line: 38, explanation: "اجتياز الحلقة: الانتقال من A إلى B ثم من B إلى C.", phase: 'init' },
  { line: 39, explanation: "الانتقال للخطوة التالية: temp يقف الآن على العقدة C.", phase: 'init' },
  { line: 41, explanation: "ربط العقدة D بنهاية القائمة لجعل مؤشر C->next يشير إلى العقدة الأخيرة D.", phase: 'init' },
  { line: 42, explanation: "الخروج والعودة لـ main.", phase: 'init' },
  // back after D
  { line: 152, explanation: "فحص (i == 0)؟ لا، i = 3.", phase: 'init' },
  { line: 153, explanation: "فحص (i == numNodes - 1)؟ نعم (3 == 3)، إسناد 'D' إلى goalName لتحديد هدف الخوارزمية النهائي.", phase: 'init' },
  { line: 154, explanation: "نهاية حلقة إدخال العقد بالكامل.", phase: 'init' },

  // EDGE TRANSITIONS INPUT PHASE
  { line: 155, explanation: "طباعة عنوان قسم إدخال المسارات/الحواف وتكلفة العبور الفعلية بين العقد.", terminal: "\n--- Input Edge Transitions and Costs (g) ---", phase: 'edges' },
  { line: 156, explanation: "دخول حلقة تكرار لانهائية while (true) لاستقبال الحواف حتى إدخال كلمة الخروج 'exit'.", phase: 'edges' },
  { line: 157, explanation: "تعريف متغيرات نصية from و to لتخزين المنطلق والمستقر.", phase: 'edges' },
  { line: 158, explanation: "تعريف متغير cost لحفظ التكلفة الفعلية للمسار.", phase: 'edges' },
  
  // EDGE A -> B (2)
  { line: 159, explanation: "طلب اسم العقدة المصدر (From Node).", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم إدخال 'A'.", terminal: "From Node (type 'exit' to stop): A", phase: 'edges' },
  { line: 161, explanation: "التحقق من الرغبة بالخروج (from == \"exit\")؟ لا، نتابع في بناء الحواف.", phase: 'edges' },
  { line: 162, explanation: "طلب العقدة الهدف (To Node).", phase: 'edges' },
  { line: 163, explanation: "إدخال الوجهة: 'B'.", terminal: "To Node: B", phase: 'edges' },
  { line: 164, explanation: "طلب تكلفة عبور المسار الفعلي (Cost).", phase: 'edges' },
  { line: 165, explanation: "إدخال تكلفة الانتقال من A إلى B وهي 2.0.", terminal: "Cost: 2", phase: 'edges' },
  { line: 166, explanation: "استدعاء دالة addEdge لبناء وتخزين الحافة الموجهة بالاتصال (A -> B) بالوزن 2.", phase: 'edges' },
  // inside addEdge A->B
  { line: 53, explanation: "دخول دالة addEdge للربط بالذاكرة بين العقدتين من A و B.", phase: 'edges' },
  { line: 54, explanation: "استدعاء دالة findNode المساعدة للحصول على العنوان المباشر للكتلة البرمجية الخاصة بالعقدة 'A'.", phase: 'edges' },
  // inside findNode A
  { line: 44, explanation: "دخول دالة findNode للبحث عن العقدة باسم 'A'.", phase: 'edges' },
  { line: 45, explanation: "تأسيس مؤشر بحث temp يشير إلى رأس القائمة (A).", phase: 'edges' },
  { line: 46, explanation: "فحص (temp != nullptr)؟ نعم، temp يشير إلى العقدة A وليس null.", phase: 'edges' },
  { line: 47, explanation: "مقارنة الاسم (temp->name == \"A\")؟ نعم تطابق تام، إعادة عنوان العقدة A فوراً وقطع البحث.", phase: 'edges' },
  // back in addEdge
  { line: 55, explanation: "التحقق من عنوان المصدر (fromNode == nullptr)? لا، العنوان صالح وغير مفرغ.", phase: 'edges' },
  { line: 57, explanation: "حجز مساحة ذاكرة جديدة لهيكل الحافة (Edge) وحفظ مؤشرها باسم newEdge.", updateNodes: [{ name: 'A', edges: [{ to: 'B', cost: 2 }] }], phase: 'edges' },
  { line: 58, explanation: "تعيين اسم العقدة المستهدفة للحافة newEdge->to ليصبح 'B'.", phase: 'edges' },
  { line: 59, explanation: "تعيين وزن وتكلفة الحافة newEdge->cost بالقيمة 2.0.", phase: 'edges' },
  { line: 60, explanation: "تهيئة المؤشر التالي newEdge->next بالـ nullptr لعدم وجود حواف لاحقة.", phase: 'edges' },
  { line: 62, explanation: "التحقق هل العقدة A خالية من أي حواف سابقة (edgesHead == nullptr)؟ نعم، هي كذلك.", phase: 'edges' },
  { line: 63, explanation: "جعل مؤشر العقدة A المسمى edgesHead يوجه مباشرة إلى الحافة المتكونة جديداً (A -> B).", phase: 'edges' },
  { line: 71, explanation: "انتهاء دالة addEdge والرجوع لمتابعة حلقة main متممة العملية بالذاكرة.", phase: 'edges' },

  // EDGE A -> C (4)
  { line: 156, explanation: "دورة تكرار جديدة لإدخال الحافة الثانية.", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم إدخال 'A'.", terminal: "From Node (type 'exit' to stop): A", phase: 'edges' },
  { line: 163, explanation: "إدخال الوجهة: 'C'.", terminal: "To Node: C", phase: 'edges' },
  { line: 165, explanation: "إدخال التكلفة: 4.0.", terminal: "Cost: 4", phase: 'edges' },
  { line: 166, explanation: "استدعاء addEdge لإضافة الطريق الثاني للعقدة A المتوجه إلى C بوزن 4.", phase: 'edges' },
  // inside addEdge A->C
  { line: 53, explanation: "دخول دالة addEdge للربط من A إلى C.", phase: 'edges' },
  { line: 54, explanation: "تتبع findNode حتى الحصول على عنوان العقدة المصدر A.", phase: 'edges' },
  { line: 57, explanation: "إنشاء كائن حافة Edge جديد بالذاكرة ممهداً بـ C ووزن 4.", updateNodes: [{ name: 'A', edges: [{ to: 'B', cost: 2 }, { to: 'C', cost: 4 }] }], phase: 'edges' },
  { line: 62, explanation: "التحقق (edgesHead == nullptr)؟ لا، العقدة A تملك مسبقاً حافة للوصول إلى B.", phase: 'edges' },
  { line: 64, explanation: "الدخول بفرع الـ else للمرور وتخطي الحواف والوصل لنهايتها لإضافة الحافة الجديدة.", phase: 'edges' },
  { line: 65, explanation: "إنشاء مؤشر مؤفت temp يشير لرأس الحواف للعقدة A وهو المسار (A -> B).", phase: 'edges' },
  { line: 66, explanation: "حلقة التحقق (temp->next != nullptr)؟ لا، الحافة next هي null لأنها وحيدة.", phase: 'edges' },
  { line: 69, explanation: "تحديث مؤشر الحافة الحالية (A->B) ليكون next مساوياً للحافة الجديدة (A->C) مشكلين قائمة متصلة من العلاقات.", phase: 'edges' },
  { line: 71, explanation: "الرجوع والعودة للدالة main.", phase: 'edges' },

  // EDGE B -> C (1)
  { line: 156, explanation: "دورة تكرار جديدة لإدخال الحافة الثالثة.", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم إدخال 'B'.", terminal: "From Node (type 'exit' to stop): B", phase: 'edges' },
  { line: 163, explanation: "إدخال الوجهة: 'C'.", terminal: "To Node: C", phase: 'edges' },
  { line: 165, explanation: "إدخال التكلفة: 1.0.", terminal: "Cost: 1", phase: 'edges' },
  { line: 166, explanation: "استدعاء addEdge لحساب الطريق الموجه (B -> C) بالوزن 1.", phase: 'edges' },
  // inside addEdge B->C
  { line: 53, explanation: "دخول دالة addEdge للربط من B إلى C بتكلفة 1.", phase: 'edges' },
  { line: 54, explanation: "رصد findNode المساعدة للوصول لكتلة العقدة B بالذاكرة.", phase: 'edges' },
  { line: 57, explanation: "إنشاء الحافة الجديدة بالذاكرة وربطها بالوجهة C والوزن 1.", updateNodes: [{ name: 'B', edges: [{ to: 'C', cost: 1 }] }], phase: 'edges' },
  { line: 62, explanation: "التحقق (edgesHead == nullptr)؟ نعم، العقدة B لا تملك مسارات سابقة.", phase: 'edges' },
  { line: 63, explanation: "تعليق الحافة (B->C) مباشرة في رأس مؤشر edgesHead الخاص بالعقدة B.", phase: 'edges' },
  { line: 71, explanation: "الرجوع لـ main.", phase: 'edges' },

  // EDGE B -> D (5)
  { line: 156, explanation: "دورة تكرار جديدة لإدخال حافة رابعة.", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم إدخال 'B'.", terminal: "From Node (type 'exit' to stop): B", phase: 'edges' },
  { line: 163, explanation: "إدخال الوجهة: 'D'.", terminal: "To Node: D", phase: 'edges' },
  { line: 165, explanation: "إدخال التكلفة: 5.0.", terminal: "Cost: 5", phase: 'edges' },
  { line: 166, explanation: "استدعاء addEdge لإضافة الحافة الإضافية من B للوصول للهدف D.", phase: 'edges' },
  // inside addEdge B->D
  { line: 53, explanation: "دخول addEdge للربط من B إلى D.", phase: 'edges' },
  { line: 57, explanation: "إنشاء مساحة للحافة بالوزن 5 والوجهة D في الذاكرة العشوائية.", updateNodes: [{ name: 'B', edges: [{ to: 'C', cost: 1 }, { to: 'D', cost: 5 }] }], phase: 'edges' },
  { line: 62, explanation: "التحقق (edgesHead == nullptr)؟ لا، B تملك حافة واصلة لـ C.", phase: 'edges' },
  { line: 65, explanation: "تهيئة temp في قائمة حواف B.", phase: 'edges' },
  { line: 69, explanation: "تحديث المسار (B->C)->next ليشير نحو المسار الجديد (B->D) لتنظيمها بالترتيب التسلسلي.", phase: 'edges' },
  { line: 71, explanation: "الرجوع والعودة لـ main.", phase: 'edges' },

  // EDGE C -> D (2)
  { line: 156, explanation: "دورة تكرار جديدة لإدخال الحافة الخامسة.", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم إدخال 'C'.", terminal: "From Node (type 'exit' to stop): C", phase: 'edges' },
  { line: 163, explanation: "إدخال الوجهة: 'D'.", terminal: "To Node: D", phase: 'edges' },
  { line: 165, explanation: "إدخال التكلفة: 2.0.", terminal: "Cost: 2", phase: 'edges' },
  { line: 166, explanation: "استدعاء addEdge لربط العقدة C مباشرة بالهدف D بتكلفة عبور 2.", phase: 'edges' },
  // inside addEdge C->D
  { line: 53, explanation: "دخول addEdge للربط من C إلى D.", phase: 'edges' },
  { line: 57, explanation: "إنشاء كائن الحافة المصدرة لـ D والوزن 2 في الذاكرة.", updateNodes: [{ name: 'C', edges: [{ to: 'D', cost: 2 }] }], phase: 'edges' },
  { line: 62, explanation: "رصد edgesHead بـ C والتحقق إذا كان null؟ نعم، تعليق الحافة مباشرة برأس قائمة العلاقات لـ C.", phase: 'edges' },
  { line: 71, explanation: "الرجوع ومتابعة main.", phase: 'edges' },

  // EXIT INPUT
  { line: 156, explanation: "دورة تكرار جديدة لاستقبال المزيد من البيانات أو إنهاء القسم.", phase: 'edges' },
  { line: 160, explanation: "قراءة المصدر: تم كتابة الكلمة المفتاحية 'exit'.", terminal: "From Node (type 'exit' to stop): exit", phase: 'edges' },
  { line: 161, explanation: "الشرط (from == \"exit\") يتحقق نجاحه، كسر الحلقة ومتابعة البرنامج البرمجي بالأسفل.", phase: 'edges' },

  // RUN A* ALGORITHM
  { line: 168, explanation: "استدعاء الدالة المحورية runAStar لتشغيل واجهة الحساب الأقصر بالرسم البياني المبني.", phase: 'search' },
  // inside runAStar
  { line: 118, explanation: "دخول دالة البحث runAStar وتمرير رأس قائمة العقد والبداية A والهدف D والإجمالي 4.", phase: 'search' },
  { line: 119, explanation: "استدعاء findNode لاستخراج كائن العقدة البدئية 'A' لتهيئتها.", phase: 'search' },
  { line: 120, explanation: "التحقق هل العقدة A موجودة بالذاكرة فعلاً؟ نعم، صالحة وذات عنوان معلوم.", phase: 'search' },
  { line: 121, explanation: "ضبط وزيادة التكلفة التراكمية الفعلية لعقدة الانطلاق لتساوى صفر startNode->g = 0.", updateNodes: [{ name: 'A', g: 0, f: 6 }], phase: 'search' },
  { line: 122, explanation: "حساب التكلفة الكلية المقدرة لأول عقدة f = g + h أي (0 + 6) لتساوي 6.", phase: 'search' },
  { line: 125, explanation: "فتح حلقة الفحص والتكرار بعدد العقد الإجمالي (4 مرات) لضمان فحص متكامل للعقد.", phase: 'search' },

  // A* INTERATION 1: Node A
  { line: 126, explanation: "استدعاء دالة getSmallestFNode لجلب العقدة غير المزارة التي تحظى بأقل تكلفة كلية f بالذاكرة.", phase: 'search' },
  // inside getSmallestFNode
  { line: 88, explanation: "دخول دالة getSmallestFNode لتصفح قائمة العقد.", phase: 'search' },
  { line: 89, explanation: "تهيئة مؤشر smallest بقيمة nullptr وتحديد أصغر قيمة فحص كبداية بـ 999.0.", phase: 'search' },
  { line: 90, explanation: "وضع عنوان مؤشر تصفح temp يبدأ من رأس العام للقائمة بالـ RAM (العقدة A).", phase: 'search' },
  { line: 92, explanation: "بدء التكرار طالما لم نبلغ نهاية قائمة العقد بالذاكرة العامة.", phase: 'search' },
  { line: 93, explanation: "العقدة A: هل هي غير مزارة ولها قيمة f أقل من 999.0؟ نعم (!visited && 6 < 999.0).", phase: 'search' },
  { line: 94, explanation: "تحديث القيمة الصغرى المتوقعة بالبحث إلى 6.0.", phase: 'search' },
  { line: 95, explanation: "تعيين العقدة 'A' كأفضل خيار حالي للعثور على المسار.", phase: 'search' },
  { line: 97, explanation: "الانتقال للعقدة التالية بالقائمة (العقدة B).", phase: 'search' },
  { line: 93, explanation: "العقدة B: هل f (999.0) أقل من الحد المستهدف الحالي (6.0)؟ لا، شرط خاطئ.", phase: 'search' },
  { line: 97, explanation: "الانتقال للعقدة C ثم للعقدة D للتحقق من قيم f الخاصة بهم.", phase: 'search' },
  { line: 99, explanation: "اكتمال الفحص، وإرجاع عنوان العقدة الصاحبة لأقل f وقيمتها 6 وهي العقدة 'A'.", phase: 'search' },
  // back in runAStar
  { line: 128, explanation: "التحقق هل العقدة الحالية A فارغة (null) أو هي الهدف المذكور D؟ لا، A صالحة وليست الهدف الرئيسي.", activeNode: 'A', phase: 'search' },
  { line: 132, explanation: "وسم العقدة النشطة A بأنها مزارة بالكامل (visited = true) وتضمينها لمجموعة Closed List لمنع تكرار مسارها.", updateNodes: [{ name: 'A', visited: true }], phase: 'search' },
  { line: 133, explanation: "استدعاء دالة updateNeighbors لجبر العقد المرتبطة بـ A وتحديث قيم f و g وجعل الأب لها A.", phase: 'search' },
  // inside updateNeighbors A
  { line: 102, explanation: "دخول دالة updateNeighbors للعقدة الحالية A.", phase: 'search' },
  { line: 103, explanation: "توجيه مؤشر تصفح الحواف edgeTemp ليرنو نحو رأس العلاقات لـ A وهو الطريق (A -> B).", phase: 'search' },
  { line: 104, explanation: "دوران طالما لم تفرغ العلاقات: فحص العلاقة (A -> B) بالوزن 2.", phase: 'search' },
  { line: 105, explanation: "البحث بالاسم للوصول لكائن العقدة الجارة 'B'.", phase: 'search' },
  { line: 106, explanation: "التحقق من وجود الجار B وأنه لم يزر مسبقاً؟ نعم، B متاحة وغير مزارة فعلياً.", phase: 'search' },
  { line: 107, explanation: "حساب العبور الفعلي المقترح للوصول لعقدة B عبر المرور بـ A: g(B) = g(A) + 2 = 0 + 2 = 2.0.", phase: 'search' },
  { line: 108, explanation: "هل التكلفة المنتجة (2.0) أقل من التكلفة g السابقة المسجلة لـ B (999.0)؟ نعم، شرط محقق بنجاح.", phase: 'search' },
  { line: 109, explanation: "تحديث القيمة الفعلية للجار B بـ g_new المستقرة بـ 2.0.", updateNodes: [{ name: 'B', g: 2, f: 6, parent: 'A' }], phase: 'search' },
  { line: 110, explanation: "إعادة حساب التكلفة الكلية المتوقعة لـ B بجمع g مع h الخاصة بها: f = 2 + 4 = 6.0.", phase: 'search' },
  { line: 111, explanation: "تسجيل العقدة 'A' لتمثل الأب الفعلي الحاضن للطريق الأمثل نحو العقدة B.", phase: 'search' },
  { line: 114, explanation: "الانتقال للامام edgeTemp = edgeTemp->next للتحرك نحو العلاقة اللاحقة وهي الحافة (A -> C) بالوزن 4.", phase: 'search' },
  { line: 105, explanation: "الحصول على عنوان العقدة الجارة المستقرة 'C'.", phase: 'search' },
  { line: 106, explanation: "التحقق من وجودها بالذاكرة وعدم زيارتها؟ نعم متصورة وغير مزارة.", phase: 'search' },
  { line: 107, explanation: "حساب التكلفة الفرضية لـ C من A: g(C) = g(A) + 4 = 0 + 4 = 4.0.", phase: 'search' },
  { line: 108, explanation: "التحقق هل التكلفة المكتشفة (4.0) أفضل من السابقة (999.0)؟ نعم، أفضل بشكل جلي.", phase: 'search' },
  { line: 109, explanation: "تحديث التكلفة الفعلية للجار C بـ 4.0.", updateNodes: [{ name: 'C', g: 4, f: 6, parent: 'A' }], phase: 'search' },
  { line: 110, explanation: "تحديث التكلفة الكلية المتوقعة لـ C بـ f = g + h أي (4 + 2) لتساوي 6.0.", phase: 'search' },
  { line: 111, explanation: "ربط العقدة 'A' كأب مؤقت للعقدة C.", phase: 'search' },
  { line: 114, explanation: "الانتقال للامام. لا توجد حواف إضافية خارجة من العقدة A (المؤشر null).", phase: 'search' },
  { line: 116, explanation: "انتهاء تحديث جيران العقدة A تماماً والرجوع لمتابعة حلبة دالة runAStar.", phase: 'search' },

  // A* INTERATION 2: Node B (f=6)
  { line: 125, explanation: "حلقة الخطوات تنتقل للدورة التالية step = 1 للبحث عن العقدة المناسبة اللاحقة بالرسم.", phase: 'search' },
  { line: 126, explanation: "البحث عن أصغر f غير مزار بين العقد: B(f=6)، C(f=6)، D(f=999.0). نختار العقدة 'B' لأسبقيتها بالقائمة.", phase: 'search' },
  { line: 128, explanation: "التحقق من كون العقدة B صالحة وليست الهدف النهائي D؟ نعم ليست الهدف.", activeNode: 'B', phase: 'search' },
  { line: 132, explanation: "تأكيد زيارة العقدة B بإعطائها السمة (visited = true) وإخراجها من فناء المجهول.", updateNodes: [{ name: 'B', visited: true }], phase: 'search' },
  { line: 133, explanation: "استدعاء دالة updateNeighbors لتحديث جيران العقدة B (وهما العقدتين C و D).", phase: 'search' },
  // inside updateNeighbors B
  { line: 102, explanation: "دخول تحديث جيران B بالذاكرة.", phase: 'search' },
  { line: 103, explanation: "توجيه مؤشر edgeTemp ليرصد أولى حواف B وهو المسار (B -> C) بوزن 1.", phase: 'search' },
  { line: 105, explanation: "إيجاد عنوان الكتلة البرمجية للجار 'C'.", phase: 'search' },
  { line: 106, explanation: "فحص هل الجار C مرخص للاستقراء؟ نعم، C موجود بالذاكرة ولم يعطل بحالة visited مسبقاً.", phase: 'search' },
  { line: 107, explanation: "حساب التكلفة الفعلية المقترحة للوصول لـ C عبوراً بالـ B: g(C)_new = g(B) + 1 = 2 + 1 = 3.0.", phase: 'search' },
  { line: 108, explanation: "التحقق المهم جداً: هل التكلفة الذاهبة الجديدة (3.0) أصغر من التكلفة g السابقة لعضو C بالمسار المباشر (4.0)؟ نعم، المسار عبر B أفضل بفرق تكلفة 1!", phase: 'search' },
  { line: 109, explanation: "تحديث التكلفة التراكمية g للعقدة C لتنحدر بمرتبة أفضل لتساوي 3.0.", updateNodes: [{ name: 'C', g: 3, f: 5, parent: 'B' }], phase: 'search' },
  { line: 110, explanation: "تحديث التكلفة الكلية المقترحة لـ C بـ f = g + h أي (3 + 2) لتتراجع إلى 5.0 بدلاً من 6.0.", phase: 'search' },
  { line: 111, explanation: "تحويل انتساب الأب للعقدة C ليصبح 'B' مبرهنين تفوق الطريق الجديد عبر الذاكرة.", phase: 'search' },
  { line: 114, explanation: "الانتقال للامام بالرابط التالي من جيران B وهو المسار (B -> D) بوزن 5.", phase: 'search' },
  { line: 105, explanation: "الحصول على كائن الجار المستهدف وهو الهدف 'D'.", phase: 'search' },
  { line: 106, explanation: "فحص هل D مؤهلة؟ نعم، العقدة D غير زائرة بعد.", phase: 'search' },
  { line: 107, explanation: "حساب تكلفة المسار المكتشف للوصول لـ D عبر B: g(D) = g(B) + 5 = 2 + 5 = 7.0.", phase: 'search' },
  { line: 108, explanation: "هل التكلفة المكتشفة (7.0) أفضل من السابقة المالا نهاية (999.0)؟ نعم بالتأكيد.", phase: 'search' },
  { line: 109, explanation: "تحديث التكلفة الفعلية للوصول للعقدة D لتساوي 7.0.", updateNodes: [{ name: 'D', g: 7, f: 7, parent: 'B' }], phase: 'search' },
  { line: 110, explanation: "تحديث التكلفة الكلية المتوقعة f للوصول لهدف D: f = g + h أي (7 + 0) لتساوي 7.0.", phase: 'search' },
  { line: 111, explanation: "إرسال اسم العقدة 'B' لتمثل الأب المؤقت للعقدة D.", phase: 'search' },
  { line: 114, explanation: "تصفح الروابط. لا جيران آخرين للعقدة B بالذاكرة.", phase: 'search' },
  { line: 116, explanation: "انتهاء وظيفة تتبع العلاقات لـ B ومواصلة دالة runAStar.", phase: 'search' },

  // A* INTERATION 3: Node C (f=5)
  { line: 125, explanation: "حلقة الخطوات step = 2 تبحث عن الخطوة الأفضل التالية.", phase: 'search' },
  { line: 126, explanation: "أقل f غير مزار بين العقد الباقية: C(f=5) و D(f=7). تقتنص العقدة 'C' ذات القيمة الأقل الصدارة بـ f=5.", phase: 'search' },
  { line: 128, explanation: "التحقق كون العقدة C صالحة وليست الهدف D؟ نعم ليست الهدف.", activeNode: 'C', phase: 'search' },
  { line: 132, explanation: "تأكيد واستخلاص العقدة C بحالة visited = true وتضمينها لمبنى العقد المستكشفة تصفيتها.", updateNodes: [{ name: 'C', visited: true }], phase: 'search' },
  { line: 133, explanation: "استدعاء دالة updateNeighbors لتحديث جيران العقدة C (وهي العقدة الجارة D فقط).", phase: 'search' },
  // inside updateNeighbors C
  { line: 102, explanation: "دخول دالة تحديث جيران C بالمسارات.", phase: 'search' },
  { line: 103, explanation: "تصفح روابط C ورصد المسار (C -> D) بالوزن 2.", phase: 'search' },
  { line: 105, explanation: "البحث بالاسم عن كائن الأهداف 'D'.", phase: 'search' },
  { line: 106, explanation: "فحص هل الهدف D مؤهل للروابط؟ نعم، لم يزر بعد.", phase: 'search' },
  { line: 107, explanation: "حساب المقترح المكتشف للوصول لـ D عبوراً بـ C: g(D)_new = g(C) + 2 = 3 + 2 = 5.0.", phase: 'search' },
  { line: 108, explanation: "التحقق الحاسم: هل التكلفة الفرضية عبر المسار C (5.0) أفضل من التكلفة g السابقة لـ D عبر المسار B (7.0)؟ نعم، المسار A->B->C->D أقل تكلفة بمقدار 2!", phase: 'search' },
  { line: 109, explanation: "تحديث التكلفة للهدف D لتتراجع بصورتها الأفضل مسجلة قيمة 5.0.", updateNodes: [{ name: 'D', g: 5, f: 5, parent: 'C' }], phase: 'search' },
  { line: 110, explanation: "وزن التكلفة الكلية المتوقعة f لـ D بـ f = g + h أي (5 + 0) لتتراجع إلى 5.0.", phase: 'search' },
  { line: 111, explanation: "تحديث وتثبيت الأب الأنسب الموصي بالمسار المناسب للهدف D ليكون العضيد 'C' بدلاً من B.", phase: 'search' },
  { line: 114, explanation: "الانتقال للامام ببحث العلاقات. لا توجد قنوات انتقال أخرى لعضو C بالرسم لعدم وجود روابط.", phase: 'search' },
  { line: 116, explanation: "الخروج ومتابعة دالة runAStar الرئيسية.", phase: 'search' },

  // A* INTERATION 4: Node D (f=5)
  { line: 125, explanation: "حلقة الخطوات step = 3 تبدأ دورتها الأخيرة بالفحص.", phase: 'search' },
  { line: 126, explanation: "أقل f غير مزار بين المتبقي بالذاكرة هو الهدف D بقيمة f=5.", phase: 'search' },
  { line: 128, explanation: "التحقق المهم: هل العقدة الحالية صالحة أو تطابق الهدف goalName وهو 'D'؟ نعم، لقد وصلنا لهدفنا الأساسي في الخريطة بنجاح!", activeNode: 'D', phase: 'search' },
  { line: 129, explanation: "تنفيذ كلمة الاختصار break للخروج وقطع حلقة التكرار فوراً لسلامة الحل.", phase: 'search' },
  { line: 135, explanation: "اكتمال دالة runAStar والعودة لـ main مكللين بالوصول لرحلتنا.", phase: 'search' },

  // PATH RECONSTRUCTION & OUTPUTS
  { line: 169, explanation: "البحث عن بيانات الهدف D بالذاكرة لطباعة وقراءة المسار الأيسر والحل الكلي.", phase: 'reconstruct' },
  { line: 170, explanation: "طباعة عنوان المخرجات والنتائج النهائية المكتشفة.", terminal: "\n--- Final Optimal Path Results ---", phase: 'reconstruct' },
  { line: 171, explanation: "التحقق من تعذر المسار: هل كائن الهدف مفقود أو يبعد 999.0 للتعذر؟ لا، الهدف واصل ومسجل التكلفة 5.", phase: 'reconstruct' },
  { line: 173, explanation: "الانتقال لقسم الـ else لبدء تجميع وقراءة المسار من سلسلة الآباء.", phase: 'reconstruct' },
  { line: 174, explanation: "طباعة نص تمهيدي للمسار (Optimal Path: ).", terminal: "Optimal Path: ", phase: 'reconstruct' },
  { line: 175, explanation: "استدعاء دالة الطباعة التراجعية printPathRecursive قاصدين الهدف D والبداية A.", phase: 'reconstruct' },

  // inside printPathRecursive(D)
  { line: 73, explanation: "دخول دالة الطباعة التراجعية recursive لعقدة الاستعلام الحالية 'D'.", phase: 'reconstruct' },
  { line: 74, explanation: "التحقق من بلوغ النهاية (currentName == \"\")؟ لا، الاسم هو 'D'.", phase: 'reconstruct' },
  { line: 75, explanation: "البحث عن العقدة الحالية بالمسار للوصول لاسم الأب الخاص بها 'C'.", phase: 'reconstruct' },
  { line: 76, explanation: "التحقق من وجودها بالذاكرة؟ نعم صالحة وموجودة.", phase: 'reconstruct' },
  { line: 78, explanation: "الاستدعاء التراجعي لنفس الدالة مررين الأب 'C' للوصول لأعماق البداية.", phase: 'reconstruct' },

  // inside printPathRecursive(C)
  { line: 73, explanation: "دخول دالة printPathRecursive للعقدة المستعلمة 'C'.", phase: 'reconstruct' },
  { line: 75, explanation: "الحصول على اسم الأب للعقدة 'C' وهو العضيد 'B'.", phase: 'reconstruct' },
  { line: 78, explanation: "الاستدعاء التراجعي ممررين عقدة الأب 'B' إلى الدالة التراجعية.", phase: 'reconstruct' },

  // inside printPathRecursive(B)
  { line: 73, explanation: "دخول printPathRecursive للعقدة المستعلمة 'B'.", phase: 'reconstruct' },
  { line: 75, explanation: "الحصول على الأب للعقدة 'B' وهو نقطة البداية الأساسية 'A'.", phase: 'reconstruct' },
  { line: 78, explanation: "الاستدعاء التراجعي مخصصين عقدة الأب 'A'.", phase: 'reconstruct' },

  // inside printPathRecursive(A)
  { line: 73, explanation: "دخول printPathRecursive للعقدة المستعلمة 'A' (البداية).", phase: 'reconstruct' },
  { line: 74, explanation: "التحقق هل الاسم فارغ؟ لا.", phase: 'reconstruct' },
  { line: 75, explanation: "الحصول على الأب للعقدة 'A' وهو النص الفارغ \"\" لعدم وجود أب لها.", phase: 'reconstruct' },
  { line: 78, explanation: "الاستدعاء التراجعي للعمق ممررين النص الفارغ \"\".", phase: 'reconstruct' },

  // inside printPathRecursive("")
  { line: 73, explanation: "دخول دالة printPathRecursive باسم فارغ \"\" للإشارة لبلوغ السلسلة نهايتها.", phase: 'reconstruct' },
  { line: 74, explanation: "فحص الشرط (currentName == \"\")؟ نعم قيمته فارغة، تنفيذ return فوري للعودة تراجعياً للخلف.", phase: 'reconstruct' },

  // back in printPathRecursive(A)
  { line: 80, explanation: "العودة من الاستدعاء، رصد الشرط (currentName == startName)؟ نعم (A == A) نطبع اسم البداية أولاً.", phase: 'reconstruct' },
  { line: 81, explanation: "طباعة العقدة 'A' بالكونسول لتمثل باكورة الرحلة.", terminal: "A", phase: 'reconstruct' },
  { line: 85, explanation: "انتهاء كدسة دالة printPathRecursive للعقدة A والرجوع تراجعياً للأب B.", phase: 'reconstruct' },

  // back in printPathRecursive(B)
  { line: 80, explanation: "فحص الشرط (B == A)؟ لا، ننتقل لفرع الطباعة بأسهم العبور.", phase: 'reconstruct' },
  { line: 83, explanation: "طباعة سهم الاتصال متبوعاً بالاسم 'B' بالكونسول.", terminal: " --> B", phase: 'reconstruct' },
  { line: 85, explanation: "انتهاء دالة B تراجعياً والارتداد لعقدة C.", phase: 'reconstruct' },

  // back in printPathRecursive(C)
  { line: 80, explanation: "فحص الشرط (C == A)؟ لا.", phase: 'reconstruct' },
  { line: 83, explanation: "طباعة سهم الوحدة المتوجه لـ 'C' بالكونسول.", terminal: " --> C", phase: 'reconstruct' },
  { line: 85, explanation: "تحرير العقدة C والعودة للهدف D.", phase: 'reconstruct' },

  // back in printPathRecursive(D)
  { line: 80, explanation: "فحص الشرط (D == A)؟ لا.", phase: 'reconstruct' },
  { line: 83, explanation: "طباعة سهم الوصول الأخير مقروناً باسم الهدف 'D'.", terminal: " --> D", phase: 'reconstruct' },
  { line: 85, explanation: "اكتمال دالة الطباعة بالكامل وصعود الذاكرة كلياً إلى دالة main.", optimalPath: ['A', 'B', 'C', 'D'], phase: 'reconstruct' },

  // main results printing complete
  { line: 176, explanation: "طباعة سطر جديد بالكونسول لتنظيم المخرجات بصرياً.", terminal: "\n", phase: 'reconstruct' },
  { line: 177, explanation: "طباعة التكلفة الفعلية الاجمالية المقاسة عبر المسار g(D) المكتشف وهي 5.", terminal: "Total Cost (g): 5", phase: 'reconstruct' },
  { line: 179, explanation: "إرجاع القيمة 0 لنظام التشغيل دلالة على الانتهاء السليم للبرنامج دون أخطاء.", terminal: "\n\n[الذاكرة] تم إرجاع القيمة 0 بنجاح وتحرير كامل الذاكرة العشوائية المستعملة للبرنامج.", phase: 'done' },
  { line: 180, explanation: "إغلاق دالة main ونهاية محاكاة دورة المعالج بالكامل لـ A*.", phase: 'done' }
];

export function generateSteps(): SimulationStep[] {
  const steps: SimulationStep[] = [];
  
  // Base initial state of nodes
  let currentNodes: NodeState[] = [
    { name: 'A', h: 6, g: 999, f: 999, visited: false, parent: '', edges: [] },
    { name: 'B', h: 4, g: 999, f: 999, visited: false, parent: '', edges: [] },
    { name: 'C', h: 2, g: 999, f: 999, visited: false, parent: '', edges: [] },
    { name: 'D', h: 0, g: 999, f: 999, visited: false, parent: '', edges: [] },
  ];

  let currentTerminalHistory = '';
  let activeNode: string | null = null;
  let activeNeighbors: string[] = [];
  let optimalPath: string[] = [];

  traceActions.forEach((act) => {
    // Clone nodes state to prevent reference sharing
    currentNodes = currentNodes.map(n => ({
      ...n,
      edges: n.edges.map(e => ({ ...e }))
    }));

    // Apply nodes updates if any
    if (act.updateNodes) {
      act.updateNodes.forEach(upd => {
        const nodeIdx = currentNodes.findIndex(cn => cn.name === upd.name);
        if (nodeIdx !== -1) {
          if (upd.h !== undefined) currentNodes[nodeIdx].h = upd.h;
          if (upd.g !== undefined) currentNodes[nodeIdx].g = upd.g;
          if (upd.f !== undefined) currentNodes[nodeIdx].f = upd.f;
          if (upd.visited !== undefined) currentNodes[nodeIdx].visited = upd.visited;
          if (upd.parent !== undefined) currentNodes[nodeIdx].parent = upd.parent;
          if (upd.edges !== undefined) currentNodes[nodeIdx].edges = upd.edges;
        }
      });
    }

    // Apply active nodes
    if (act.activeNode !== undefined) {
      activeNode = act.activeNode;
    }

    // Apply active neighbors
    if (act.activeNeighbors !== undefined) {
      activeNeighbors = act.activeNeighbors;
    }

    // Apply path updates
    if (act.optimalPath !== undefined) {
      optimalPath = act.optimalPath;
    }

    // Accumulate terminal history
    if (act.terminal) {
      currentTerminalHistory += act.terminal + '\n';
    }

    steps.push({
      lineIndex: act.line,
      terminal: currentTerminalHistory.trim(),
      nodes: currentNodes,
      activeNode: activeNode,
      activeNeighbors: activeNeighbors,
      highlightedEdge: act.highlightedEdge,
      optimalPath: [...optimalPath],
      explanation: act.explanation,
      phase: act.phase
    });
  });

  return steps;
}
